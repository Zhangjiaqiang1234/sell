<template>
    <transition>
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <!--详情页大图-->
                <div class="image-header">
                    <img :src="food.image">
                    <!--返回按钮-->
                    <div class="back" @click="hide">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                </div>
                <!--内容开始-->
                <div class="content">
                    <!--标题-->
                    <h1 class="title">{{food.name}}</h1>
                    <!--详情-->
                    <div class="detail">
                        <!--月售数量-->
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <!--好评率-->
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <!--价格-->
                    <div class="price">
                        <span class="now">&yen;{{food.price}}</span><span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                    </div>
                    <!--购物车组件-->
                    <div class="cartcontrol-wrapper">
                        <cartControl v-on:add-cart="_drop" :food="food"></cartControl>
                    </div>
                    <transition>
                        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count==0">加入购物车</div>
                    </transition>
                </div>
                <!--灰色分割线-->
                <split></split>
                <!--商品介绍-->
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split v-show="food.info"></split>
                <!--商品评价-->
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :select-type.sync="selectType" :only-content.sync="onlyContent" :desc="desc" :ratings="food.ratings" @refresh="refresh"></ratingselect>
                    <div class="rating-wrapper">
                        <!--评价列表-->
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating.index" class="rating-item">
                                <!--右上角用户信息-->
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span class="iconfont" :class="{'icon-ai46':rating.rateType===1,'icon-zan':rating.rateType===0}"></span>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <!--没有评价内容时显示的内容-->
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';// 加载 better-scroll
import Vue from 'vue';
import cartControl from '../cartcontrol/cartcontrol';// 加载food计数器组件
import split from '../split/split';// 样式，100%宽度的灰色分割条
import ratingselect from '../ratingselect/ratingselect';// 引入评论列表组件
// const POSITIVE = 0; // 定义全局变量，区分不同的评论列表类型 0 推荐
// const NEGATIVE = 1; // 吐槽
const ALL = 2; // 显示所有评论
export default {
    props: {
        food: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false, // 控制组件是否显示，默认不显示
            selectType: ALL, // 默认显示所有评价
            onlyContent: true, // 是否只显示有内容的评价
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    methods: {
        refresh () { // 让 better-scroll 重新计算高度
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        show () { // 显示详情
            this.showFlag = true;
            // 当显示详情的时候，对商品评价组件的值进行初始化
            this.selectType = ALL;
            this.onlyContent = true;
            // 对 better-scroll 进行初始化
            this.$nextTick(() => {
                if (!this.scroll) { // 如果是第一次初始化
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true // 因为这个 better-scroll 初始化的时候会禁用掉一些默认事件，这里设置回不禁用 click 事件
                    });
                } else { // 否则重绘
                    this.scroll.refresh();
                }
            });
        },
        hide () { // 隐藏详情
            this.showFlag = false;
        },
        addFirst (event) { // 添加第一个商品方法
            Vue.set(this.food, 'count', 1);
            // 把事件对象传出去
            let el = (event.target.nodeName === 'DIV') ? event.target : event.target.parentNode;
            this.$emit('add-cart', el);
        },
        _drop () {
            // 把 cartcontrol 传过来的事件继续传给父组件去处理
            let el = (event.target.nodeName === 'DIV') ? event.target : event.target.parentNode;
            this.$emit('add-cart', el);
        },
        needShow (type, text) { // 判断评价 item 是否应当被显示
            if (this.onlyContent && !text) { // 只显示有内容的评价
                return false;
            }
            if (this.selectType === ALL) { // 显示所有
                return true;
            } else { // 显示对应条件评论
                return this.selectType === type;
            }
        }
    },
    components: {
        cartControl,
        split,
        ratingselect
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
.food
    position :fixed
    left:0
    top:0
    bottom:48px
    z-index :41
    width :100%
    background :#fff
    transition: all .2s linear
    transform : translateX(0)
    &.v-enter,&.v-leave-active
        transform : translateX(100%)
    .image-header
        position: relative
        width :100%
        height:0
        padding-top: 100%
        img
            position: absolute
            left:0
            top:0
            width: 100%
            height :100%
        .back
            position: absolute
            left: 0
            top: 10px
            .iconfont
                display: block
                padding: 10px
                font-size: 20px
                color: #fff
    .content
        padding :18px
        position: relative
        .title
            line-height :14px
            margin-bottom :8px
            font-size: 14px
            font-weight: 700
            color: rgb(7,17,27)
        .detail
            margin-bottom: 18px
            line-height :10px
            height: 10px
            font-size:0
            .sell-count,.rating
                font-size:10px
                color: rgb(147,153,159)
            .sell-count
                margin-right:12px
        .price
            font-weight :700
            line-height :24px
            font-size:0
            .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240,20,20)
            .old
                text-decoration :line-through
                font-size: 10px
                color: rgb(147,153,159)
        .cartcontrol-wrapper
            position: absolute
            right: 12px
            bottom :12px
        .buy
            position: absolute
            right: 18px
            bottom :18px
            z-index: 10
            height: 24px
            line-height :24px
            padding: 0 12px
            box-sizing: border-box
            border-radius :12px
            font-size: 10px
            color: #ffffff
            background: rgb(0,160,220)
            transition:all 0.2s
            opacity:1
            &.v-enter,&.v-leave
                opacity: 0
    .info
        padding :18px
        .title
            line-height :14px
            margin-bottom:6px
            font-size: 14px
            color: rgb(7,17,27)
        .text
            line-height: 24px
            padding:0 8px
            font-size: 12px
            color: rgb(77,85,93)
            font-size: 12px
    .rating
        padding-top:18px
        .title
            line-height :14px
            margin-left:18px
            font-size: 14px
            color:rgb(7,17,27)
        .rating-wrapper
            padding: 0 18px
            box-sizing :border-box
            .rating-item
                position :relative
                padding: 16px 0
                border-1px(rgba(7,17,27,0.1))
                .user
                    position :absolute
                    right: 0
                    top: 16
                    line-height: 12px
                    font-size:0
                    .name
                        display: inline-block
                        margin-right:6px
                        vertical-align :top
                        font-size:10px
                        color:rgb(147,153,159)
                    .avatar
                        display: inline-block
                        vertical-align :top
                        border-radius :50%
                .time
                    margin-bottom:6px
                    font-size:10px
                    line-height:12px
                    color:rgb(147,153,159)
                .text
                    line-height: 16px
                    font-size:12px
                    color: rgb(7,17,27)
                    .icon-zan,.icon-ai46
                        line-height: 16px
                        margin-right:4px
                        font-size:12px
                    .icon-zan
                        color:rgb(0,160,220)
                    .icon-ai46
                        color:rgb(147,153,159)
        .no-rating
            padding:16px 0
            font-size: 12px
            color:rgb(147,153,159)
</style>
