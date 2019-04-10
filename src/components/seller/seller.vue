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
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll';// 加载 better-scroll
import star from '../star/star';// 星星组件
export default{
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        star
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
            padding-bottom :18px
            line-height :18px
            font-size:0
            border-1px(rgba(1,17,27,0.1))
            .star
                display: ineline-block
                vertical-align :middle
                margin-right:8px
            .text
                margin-right:12px
                display: inline-block
                vertical-align :middle
                font-szie:10px
                color:rgb(77,85,93)
</style>
