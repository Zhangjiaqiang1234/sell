<template>
    <div class="seller">
        <div class="seller-content">
            <!--概述-->
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span><span>元</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span><span>元</span>
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span><span>分钟</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!--灰色分隔条-->
            <split></split>
            <!--公告与活动-->
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <!--活动列表-->
                <ul class="supports" v-if="seller.supports">
                    <li v-for="(i,index) in seller.supports" :key="index" class="supports-item">
                        <cover-icon :sub="2" :index="i.type"></cover-icon>
                        <span class="text">{{i.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll';// 加载 better-scroll
import star from '../star/star';// 星星组件
import split from '../split/split';// 样式，100%宽度的灰色分割条
export default{
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        star,
        split
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
.seller
    position: absolute
    top:174px
    bottom:0
    left:0
    width :100%
    overflow :hidden
    .overview
        box-sizing:border-box
        padding:18px
        .title
            margin-bottom:8px
            line-height:14px
            color: rgb(7,17,27)
            font-size:14px
        .desc
            padding-bottom :13px
            line-height :18px
            font-size:0
            border-1px(rgba(1,17,27,0.1))
            .star
                display: inline-block
                vertical-align :top
                margin-right:8px
            .text
                margin-right:12px
                display: inline-block
                vertical-align :top
                font-size:10px
                color:rgb(77,85,93)
        .remark
            display :flex
            padding-top:18px
            .block
                flex:1
                text-align: center
                border-right:1px solid rgba(1,17,27,0.1)
                &:last-child
                    border:none
                h2
                    margin-bottom:4px
                    line-height :10px
                    font-size:10px
                    color:rgb(147,153,159)
                .content
                    line-height:24px
                    font-size:10px
                    color:rgb(7,17,27)
                    .stress
                        font-size:24px
    .bulletin
        box-sizizing:border-box
        padding:18px 18px 0 18px
        .title
            margin-bottom :8px
            line-height :14px
            color: rgb(1,17,27)
        .content-wrapper
            padding:0 12px 16px
            border-1px()
            .content
                line-height :24px
                font-size:12px
                color: rgb()
        .supports
</style>
