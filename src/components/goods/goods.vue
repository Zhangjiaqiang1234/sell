<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <!--左侧菜单列表开始-->
            <ul>
                <li v-for="(item,index) in goods" :key="item.index" class="menu-item" :class="{current:currentIndex===index}" @click="selectMenu(index)">
                    <!--优惠信息图标-->
                    <span class="text"><cover-icon :sub="3" v-show="item.type>0" :index="item.type"></cover-icon>{{item.name}}</span>
                </li>
            </ul>
            <!--左侧菜单列表结束-->
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <!--右侧外层内容列表开始-->
            <ul>
                <li v-for="item in goods" :key="item.index" class="food-list-hook">
                    <!--列表所属标题内容-->
                    <h1 class="title">{{item.name}}</h1>
                    <!--里层内容列表开始-->
                    <ul>
                        <li v-for="food in item.foods" :key="food.index" class="food-item">
                            <!--左侧图标-->
                            <div class="icon">
                                <img :src="food.icon">
                            </div>
                            <!--右侧内容-->
                            <div class="content">
                                <!--标题-->
                                <h2 class="name">{{food.name}}</h2>
                                <!--简介-->
                                <p class="desc">{{food.description}}</p>
                                <!--额外信息-->
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <!--价格-->
                                <div class="price">
                                    <span class="now">&yen;{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                                </div>
                            </div>
                            <!--food计数器-->
                            <div class="cartcontrol-wrapper">
                                <cartControl v-on:add-cart="_drop" :food="food"></cartControl>
                            </div>
                        </li>
                    </ul>
                    <!--里层内容列表结束-->
                </li>
            </ul>
            <!--右侧外层内容列表结束-->
        </div>
        <!--购物车组件-->
        <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';// 加载 better-scroll
import shopcart from '../shopcart/shopcart';// 加载 购物车组件
import coverIcon from '../cover-icon/cover-icon';// 加载 优惠信息小图标组件
import cartControl from '../cartcontrol/cartcontrol';// 加载food计数器组件
const ERR_OK = 0;
export default{
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            goods: [],
            listHeight: [], // 用于记录右侧可滚动模块的大标题距离顶部的距离
            scrollY: 0 // 用于记录右侧模块滑动的时候的scroll-y值
        };
    },
    created () {
        this.$http.get('/api/goods').then((res) => { // 获取商品数据
            res = res.body;
            if (res.errno === ERR_OK) {
               this.goods = res.data;
               this.$nextTick(() => {
                    this._initScroll();
                    this._calcHeight();
               });
            }
        }, () => {
            // ajax 失败时的回调函数
            console.log('ajax 请求goods数据失败 url = /api/goods');
        });
    },
    computed: {
        currentIndex () { // 当滚动区域到达某个位置时，左侧对应导航显示特别的样式
            let height1, height2;
            for (let i = 0; i < this.listHeight.length; i++) {
                height1 = this.listHeight[i];
                height2 = this.listHeight[i + 1];
                if (this.scrollY > 0 || !height2 || (this.scrollY <= height1 && this.scrollY > height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods () { // 遍历商品，选中用户选择了的商品，然后返回给 shopcart 组件
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    methods: {
        selectMenu (index) { // 点击左侧列表，右侧跳转到对应的位置
            let foodList = this.getEles('.food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300); // scrollToElement 是 better-scroll 封装的一个方法，第二个参数是动画时间
        },
        _initScroll () { // 初始化滚动条，让特定元素可以滚动
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true // 因为这个 better-scroll 初始化的时候会禁用掉一些默认事件，这里设置回不禁用 click 事件
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3, // 当设置这个值的时候，那么滚动的时候就可以监听到改变的scroll值
                click: true
            });

            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.round(pos.y); // 把监听到的scroll值保存下来
            });
        },
        _calcHeight () { // 当滚动元素的高度发生变化的时候，要重新调用这个方法重新计算位置
            let foodList = this.getEles('.food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length - 1; i++) { // 计算右侧每个大标题scroll位置
                height -= foodList[i].clientHeight;
                this.listHeight.push(height);
            }
        },
        _drop (target) {
            // 优化体验，异步的进行动画队列
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        }
    },
    components: {
        coverIcon,
        shopcart,
        cartControl
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
@import 'goods.styl';
</style>
