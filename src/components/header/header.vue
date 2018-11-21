<template>
    <!--头部开始-->
    <div class="header">
        <!--顶部信息开始-->
        <div class="content-wrap">
            <div class="avatar">
                <img :src="seller.avatar">
            </div>
            <div class="content">
                <!--标题-->
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <!--简介-->
                <div class="description">
                    {{seller.description }} / {{seller.deliveryTime }}分钟送达
                </div>
                <!--支持-->
                <div v-if="seller.supports" class="support">
                    <cover-icon :sub="1" :index="seller.supports[0].type"></cover-icon><span class="text">{{seller.supports[0].description }}</span>
                </div>
            </div>
            <!--右下角数字提示-->
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <div class="count">{{seller.supports.length}}个</div>
                <i class="iconfont icon-youjiantou"></i>
            </div>
        </div>
        <!--顶部信息结束-->

        <!--公报开始-->
        <div class="bulletin-wrap" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="iconfont icon-youjiantou"></i>
        </div>
        <!--公报结束-->

        <!--背景图开始-->
        <div class="background">
            <img :src="seller.avatar" >
        </div>
        <!--背景图结束-->

        <!--详情（全屏浮窗）开始-->
        <transition>
            <div v-show="detailShow" class="detail">
                <!--主要内容区域，sticky footer 布局-->
                <div class="detail-wrap clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <!--星星-->
                        <div class="star-wrapper">
                            <star :score="seller.score" :size="48"></star>
                        </div>
                        <!--优惠信息-->
                        <div v-if="seller.supports" class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li v-for="(i,index) in seller.supports" :key="index" class="supports-item">
                                <cover-icon :sub="2" :index="i.type"></cover-icon>
                                <span class="text">{{i.description}}</span>
                            </li>
                        </ul>
                        <!--商家公告-->
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <!--关闭按钮-->
                <div class="detail-close" @click="hideDetail">
                    <i class="iconfont icon-guanbi"></i>
                </div>
            </div>
        </transition>
        <!--详情结束-->
    </div>
    <!--头部结束-->
</template>

<script type="text/ecmascript-6">
    import star from '../star/star';
    import coverIcon from '../cover-icon/cover-icon';
    export default {
        props: ['seller'],
        data () {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail () {
                this.detailShow = true;
            },
            hideDetail () {
                this.detailShow = false;
            }
        },
        components: {
            star, coverIcon
        }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
.header
    position :relative
    overflow :hidden
    background :rgba(7,17,27,0.5)
    .content-wrap
        position: relative
        padding: 24px 12px 15px 24px
        font-size: 0
        color: #fff
        .avatar
            display: inline-block
            & > img
                width: 64px
                height: 64px
                border-radius: 2px
        .content
            vertical-align: top
            display: inline-block
            font-size: 14px
            margin-left: 16px
            .title
                font-size: 16px
                line-height: 14px
                .brand
                    display: inline-block
                    width: 30px
                    height: 18px
                    bg-image(brand)
                    background-size: 100% auto
                    vertical-align: middle
                .name
                    font-size: 16px
                    font-weight: bold
                    vertical-align: middle
                    line-height: 16px
            .description
                font-size: 12px
                margin-top: 9px
                margin-bottom: 10px
                line-height: 12px
            .support
                font-size: 12px
                .cover-icon
                    margin-right: 4px
                & > span
                    display: inline-block
                    vertical-align: middle
                .text
                    font-size: 10px
        .support-count
            position: absolute
            right: 12px
            bottom: 18px
            font-size: 0px
            font-weight: 200
            padding: 0 8px
            height: 24px
            line-height: 24px
            border-radius: 12px
            background: rgba(0,0,0,0.2)
            text-align: center
            .count
                display: inline-block
                font-size: 10px
                vertical-align: top
            .icon-youjiantou
                line-height :24px
                vertical-align: top
                font-size: 8px
                margin-left :2px
    .bulletin-wrap
        height: 28px
        line-height :28px
        padding: 0 25px 0 12px
        background: rgba(7,17,27,0.2)
        overflow :hidden
        white-space:nowrap
        text-overflow:ellipsis
        color: #fff
        position :relative
        .bulletin-title
            display: inline-block
            width:22px
            height:12px
            bg-image('bulletin')
            background-size: 100% auto
            background-repeat:no-repeat
        .bulletin-text
            vertical-align :top
            font-size:10px
            font-weight :200
            margin: 0 4px
        .icon-youjiantou
            position :absolute
            bottom :0
            top: 1px
            right:22px
            margin:auto
            font-size :8px
    .background
        position :absolute
        top:0
        left:0
        width :100%
        height :100%
        z-index: -1
        filter:blur(10px)
        img
            display :block
            width :100%
            height :100%
    .detail
        position :fixed
        width :100%
        height :100%
        left: 0
        top: 0
        z-index: 100
        overflow: auto
        color: #fff
        background: rgba(7,17,27,0.8)
        transition: all .5s
        -webkit-backdrop-filter:blur(10px)
        backdrop-filter:blur(10px)
        &.v-enter-to
            opacity :1
            background: rgba(7,17,27,0.8)
        &.v-enter,&.v-leave-active
            opacity :0
            background: rgba(7,17,27,0)
        .detail-wrap
            width :100%
            min-height :100%
            .detail-main
                margin-top:64px
                padding-bottom:64px
                .name
                    font-weight :700
                    font-size :16px
                    line-height :16px
                    text-align :center
                .star-wrapper
                    text-align :center
                    margin-top:19px
                    padding :2px 0
                .title
                    display :flex
                    width :80%
                    margin :28px auto 24px auto
                    align-items :center
                    .line
                        flex :1
                        height:1px
                        background: rgba(255,255,255,0.2)
                    .text
                        font-size:14px
                        line-height :1
                        padding :0 12px
                        font-weight :700
                .supports
                    width:80%
                    padding :0 12px
                    font-size:0
                    margin :0 auto
                    box-sizing :border-box
                    .supports-item
                        margin-bottom: 12px
                        .cover-icon
                            width :16px;
                            height:16px
                            margin-right:6px
                        .text
                            font-size:12px
                            line-height 16px
                            font-weight:200
                            vertical-align :top
                    &.last-child
                        margin-bottom :0
                .bulletin
                    width :80%
                    margin :0 auto
                    .content
                        padding :0 12px
                        line-height :26px
                        font-size :12px
        .detail-close
            width :32px
            height :32px
            line-height :32px
            text-align :center
            margin:-64px auto 0
            font-size:32px
            clear :both
            color :#94979C
</style>
