<!--购物车组件-->
<template>
    <div>
        <div class="shopcart">
            <!-- 内容容器开始 -->
            <div class="content" @click="toggleList">
                <!-- 左侧内容开始 -->
                <div class="content-left">
                    <div class="logo-wrapper">
                        <!--logo-->
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="icon iconfont icon-ai66"></i>
                        </div>
                        <!--商品个数-->
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight':totalCount>0}">&yen;{{totalPrice}}</div>
                    <div class="desc">另需配送费&yen;{{deliveryPrice}}元</div>
                </div>
                <!-- 左侧内容结束 -->
                <!-- 右侧内容开始 -->
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="this.totalPrice>this.minPrice?'enough':'not-enough'">{{payDesc}}</div>
                </div>
                <!-- 右侧内容结束 -->
            </div>
            <!-- 内容容器结束 -->

            <!--抛物线小球开始-->
            <div class="ball-container">
                <transition-group
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter">
                    <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            </div>
            <!--抛物线小球结束-->

            <!--购物车详情开始-->
            <transition>
                <div class="shopcart-list" v-show="listShow">
                    <!--头部区域-->
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <!--内容列表区域-->
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" :key="index">
                                <!--名称-->
                                <span class="name">{{food.name}}</span>
                                <!--价格-->
                                <div class="price">
                                    <span>&yen;{{food.price*food.count}}</span>
                                </div>
                                <!--按钮组件-->
                                <div class="cartcontrol-wrap">
                                    <cartControl :food="food"></cartControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
            <!--购物车详情结束-->
        </div>
        <!--遮罩-->
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="toggleList"></div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import cartControl from '../cartcontrol/cartcontrol';// 加载food计数器组件
import BScroll from 'better-scroll';// 加载 better-scroll
export default {
    props: {
        selectFoods: {
            type: Array, // 购物车的商品列表
            default () {
                return [];
            }
        },
        deliveryPrice: {
            type: Number, // 配送费
            default: 0
        },
        minPrice: {
            type: Number, // 最小起送价
            default: 0
        }
    },
    data () {
        return {
            balls: [ // 用于保存动画小球的状态
                {
                    show: false

                }, {
                    show: false

                }, {
                    show: false

                }, {
                    show: false

                }, {
                    show: false

                }
            ],
            dropBalls: [], // 用于保存运动完的小球
            fold: true // 用来表示购物车详情是否是折叠状态 true->折叠
        };
    },
    computed: {
        totalPrice () { // 计算总价
            let total = 0;
            this.selectFoods.forEach((item) => {
                total += item.price * item.count;
            });
            return total;
        },
        totalCount () { // 计算总数量
            let count = 0;
            this.selectFoods.forEach((item) => {
                count += item.count;
            });
            if (!this.fold) {
                this.initScroll();
            }
            return count;
        },
        payDesc () { // 计算计算按钮的描述
            if (this.totalPrice === 0) {
                return '¥' + this.minPrice + '元起送';
            } else if (this.totalPrice < this.minPrice) {
                return '还差¥' + (this.minPrice - this.totalPrice) + '元起送';
            } else {
                return '去结算';
            }
        },
        listShow () { // 购物车实际上是否需要展示
            if (this.totalCount <= 0) { // 如果购买的商品数量小于等于0
                return false;
            }
            let show = !this.fold;
            return show;
        }
    },
    methods: {
        drop (el) {
            for (let i = 0; i < this.balls.length; i++) { // 找到第一个show!=false的小球，并推入到 dropBalls数组中
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;// 设置状态为可显示
                    ball.el = el;// 把点击的 div 保存在 el 上
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeEnter (el) { // 动画进入之前的准备
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let react = ball.el.getBoundingClientRect();// 获取点击元素的位置信息
                    let x = react.left;
                    let y = -react.top - 11;
                    el.style.display = '';// 让元素显示
                    // 外层动画
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.querySelector('.inner-hook');
                    // 里层动画
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter (el, done) { // 动画过渡中
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;// 手动触发浏览器重绘
            this.$nextTick(() => {
                // 外层动画
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.querySelector('.inner-hook');
                // 里层动画
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
            });
            done();
        },
        afterEnter (el) {
            setTimeout(() => { // 动画进入结束后
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            }, 400);
        },
        toggleList () { // 更改购物车显示隐藏的方法
            if (this.totalCount <= 0) { // 购物车没有商品，无法更改显示状态
                return;
            }
            this.fold = !this.fold;
        },
        initScroll () { // 初始化购物车详情滚动区域方法
            if (this.scroll) { // 如果已经不是第一次初始化，那么就直接 refresh 就好
                this.scroll.refresh();
            } else { // 第一次初始化
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.listContent, {
                        click: true
                    });
                });
            }
        },
        empty () { // 清空购物车方法
            this.selectFoods.forEach((food) => {
                food.count = 0;
                this.fold = true;
            });
        },
        pay () { // 点击了去结算
            if (this.totalPrice < this.minPrice) { // 当总价小于起送价
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
        }
    },
    components: {
        cartControl
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
.shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
        width: 100%
        height:100%
        display:flex
        background: #141d27
        font-size: 0
        .content-left
            flex: 1
            .logo-wrapper
                display: inline-block
                position: relative
                top: -10px
                margin: 0 12px
                padding: 6px
                width: 56px
                height: 56px
                box-sizing: border-box
                vertical-align: top
                border-radius: 50%
                background: #141d27
                .logo
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    background: #2b343c
                    text-align: center
                    .icon
                        font-size: 30px
                        color : #80858a
                        line-height: 50px
                    &.highlight
                        background: rgb(0,160,220)
                        .icon
                            color: #fff
                .num
                    position: absolute
                    top:0
                    right:0
                    width :24px
                    height:16px
                    line-height :16px
                    text-align: center
                    border-radius :16px;
                    font-size:9px
                    font-weight:700
                    color: #fff
                    background: rgb(240,20,20)
                    box-shadow:0px 4px 8px rgba(0,0,0,0.4)
            .price
                vertical-align :top
                display: inline-block
                margin-top: 12px
                line-height :24px
                border-right: 1px solid rgba(255,255,255,0.1)
                padding-right: 12px
                box-sizing: border-box
                font-size: 16px
                font-weight :700
                color: rgba(255,255,255,0.4)
                &.highlight
                    color: #fff
            .desc
                display: inline-block
                vertical-align top
                line-height :24px
                margin: 12px 0 0 12px
                color: rgba(255,255,255,0.4)
                font-size:10px
        .content-right
            flex: 0 0 105px
            .pay
                width :105px
                text-align :center
                height: 48px
                line-height: 48px
                font-size: 12px
                font-weight :700
                color: rgba(255,255,255,0.4)
                &.not-enough
                    background :#2b333b
                &.enough
                    background :#00b43c
                    color: #fff
    .ball-container
        .ball
            position: fixed
            left: 32px
            bottom :22px
            z-index: 200
            transition :all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
            transform :translate3d(0,0,0)
            .inner
                width: 16px
                height: 16px
                border-radius :50%
                background :rgb(0,160,220)
                transition: all 0.4s linear
                transform :translate3d(0,0,0)
    .shopcart-list
        position: absolute
        top: 0
        left: 0
        z-index :-1
        width :100%
        transition :all 0.5s
        transform :translate3d(0,-100%,0)
        &.v-enter-to
            transform :translate3d(0,-100%,0)
        &.v-enter,&.v-leave-active
            transform :translate3d(0,0,0)
        .list-header
            height: 40px
            line-height: 40px
            padding :0 18px
            background #f3f5f7
            border-bottom: 1px solid rgba(7,17,27,0.1)
            .title
                float: left
                font-size:14px
                color: rgb(7,17,27)
            .empty
                float: right
                foont-size:12px
                color: rgb(0,160,220)
        .list-content
            box-sizing: border-box
            padding :0 18px
            max-height: 217px
            overflow: hidden
            background: #fff
            .food
                position: relative
                padding :12px 0
                box-sizing:border-box
                border-1px(rgba(7,17,27,0.1))
            .name
                line-height: 24px
                font-size :14px
                color: rgb(7,17,27)
            .price
                position: absolute
                right: 90px
                bottom:12px
                font-size: 14px
                line-height: 24px
                font-weight :700
                color: rgb(240,20,20)
            .cartcontrol-wrap
                position: absolute
                right: 0
                bottom:6px
.list-mask
    position: fixed
    left: 0
    top: 0
    width :100%
    height: 100%
    z-index: 40
    background :rgba(7,17,27,0.6)
    transition: all 0.5s
    opacity :1
    backdrop-filter:blur(10px)
    &.fade-enter-to
        opacity: 1
        background :rgba(7,17,27,0.6)
    &.fade-enter,&.fade-leave-active
        opacity:0
        background :rgba(7,17,27,0)
</style>
