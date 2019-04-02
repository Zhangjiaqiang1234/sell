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
@import 'food.styl';
</style>
