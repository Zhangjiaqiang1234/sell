<template>
    <div class="ratings">
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
            <ratingselect :select-type.sync="selectType" :only-content.sync="onlyContent" :desc="desc" :ratings="ratings" @refresh="refresh"></ratingselect>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star';
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
    created () {
        this.$http.get('/api/ratings').then((res) => { // 获取商品数据
            res = res.body;
            if (res.errno === ERR_OK) {
                this.ratings = res.data;
                this.$nextTick(() => {

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
</style>
