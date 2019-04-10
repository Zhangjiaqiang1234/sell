<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <!--概述开始-->
            <div class="overview">
                <!--左侧综合评分-->
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <!--右侧星级评定-->
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <!--灰色分割条-->
            <split></split>
            <!--评论条件选择组件-->
            <ratingselect :select-type.sync="selectType" :only-content.sync="onlyContent" :ratings="ratings" @refresh="refresh"></ratingselect>
            <!--评价列表-->
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" :key="rating.index">
                        <!--左侧头像-->
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar" alt="">
                        </div>
                        <!--右侧内容区块-->
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="iconfont icon-zan"></span>
                                <span class="item" v-for="item in rating.recommend" :key="item.index">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';// 加载 better-scroll
import star from '../star/star';// 星星组件
import split from '../split/split';// 样式，100%宽度的灰色分割条
import ratingselect from '../ratingselect/ratingselect';// 引入评论列表组件
const ALL = 2;
const ERR_OK = 0;
export default{
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            ratings: [], // 评价列表
            selectType: ALL, // 默认显示所有评价
            onlyContent: true // 是否只显示有内容的评价
        };
    },
    methods: {
        refresh () { // 让 better-scroll 重新计算高度
            this.$nextTick(() => {
                this.scroll.refresh();
            });
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
    created () {
        this.$http.get('/api/ratings').then((res) => { // 获取商品数据
            res = res.body;
            if (res.errno === ERR_OK) {
                this.ratings = res.data;
                this.$nextTick(() => {
                    if (!this.scroll) { // 如果是第一次初始化
                        this.scroll = new BScroll(this.$refs.ratings, {
                            click: true // 因为这个 better-scroll 初始化的时候会禁用掉一些默认事件，这里设置回不禁用 click 事件
                        });
                    } else { // 否则重绘
                        this.scroll.refresh();
                    }
                });
            }
        }, () => {
            // ajax 失败时的回调函数
            console.log('ajax 请求ratings数据失败 url = /api/ratings');
        });
    },
    components: {
        star,
        split,
        ratingselect
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
.ratings
    position :absolute
    top:174px
    bottom:0
    left :0
    width :100%
    overflow: hidden
    .overview
        display:flex
        padding: 18px 0
        .overview-left
            flex:0 0 137px
            padding:6px 0
            width :137px
            border-right: 1px solid rgba(7,17,27,0.1)
            text-align :center
            @media only screen and (max-width :320px)
                flex: 0 0 120px
                width :120px
            .score
                line-height: 28px
                font-size :24px
                color: rgb(255,153,0)
                margin-bottom:6px
            .title
                line-height :12px
                font-size:12px
                color :rgb(7,17,27)
                margin-bottom:8px
            .rank
                line-height :10px
                font-size:10px
                color: rgb(147,153,159)
        .overview-right
            flex:1
            padding:6px 0 6px 24px
            @media only screen and (max-width:320px)
                padding-left: 6px
            .score-wrapper
                margin-bottom:8px
                font-size:0
                .title
                    display: inline-block
                    vertical-align :top
                    line-height :18px
                    font-size:12px
                    color: rgb(7,17,27)
                .star
                    display: inline-block
                    vertical-align: top
                    margin:0 12px
                .score
                    display: inline-block
                    vertical-align :top
                    line-height :18px
                    font-size: 12px
                    color: rgb(255,153,0)
            .delivery-wrapper
                font-size: 0
                .title
                    line-height :18px
                    font-size:12px
                    color: rgb(7,17,27)
                .delivery
                    font-size:12px
                    color: rgb(147,153,159)
                    margin-left:12px
    .rating-wrapper
        box-sizing: border-box
        padding : 0 18px
        .rating-item
            display: flex
            padding:18px 0
            border-1px(rgba(7,17,27,0.1))
            .avatar
                flex: 0 0 28px
                width :28px
                margin-right: 12px
                img
                    border-radius :50%
            .content
                flex: 1
                position: relative
                .name
                    margin-bottom :4px
                    line-height :12px
                    font-size: 10px
                    color:rgb(7,17,27)
                .star-wrapper
                    margin-bottom :6px
                    font-size:0
                    .star
                        margin-right :6px
                        display: inline-block
                        vertical-align :top
                    .delivery
                        display: inline-block
                        vertical-align :top
                        line-height :12px
                        font-size: 10px
                        color:rgb(147,153,159)
                .text
                    margin-bottom: 8px
                    line-height :18px
                    color:rgb(7,17,27)
                    font-size:12px
                .recommend
                    line-height :16px
                    font-size:0
                    .iconfont,.item
                        display: inline-block
                        vertical-align :middle
                        margin:0 8px 4px 0
                    .iconfont
                        color:rgb(0,160,220)
                    .item
                        padding:0 6px
                        border:1px solid rgba(7,17,27,0.2)
                        border-radius 1px
                        color: rgb(147,153,159)
                        background :#fff
                        font-size :9px
                .time
                    position: absolute
                    top:0
                    right:0
                    line-height:12px
                    font-size:10px
                    color: rgb(147,153,159)
</style>
