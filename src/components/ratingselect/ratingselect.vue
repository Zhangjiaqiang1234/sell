<!--这是商品评价列表组件-->
<template>
    <div class="ratingselect">
        <!--类型选择-->
        <div class="rating-type">
            <span class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">11</span></span>
            <span class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">11</span></span>
            <span class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">7</span></span>
        </div>
        <!--选择只看有内容的评价-->
        <div class="switch" :class="{'on':onlyContent}">
            <i class="iconfont icon-dui"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // const POSITIVE = 0; // 定义全局变量，区分不同的评论列表类型 0 显示好评
    // const NEGATIVE = 1; // 显示差评
    const ALL = 2; // 默认显示全部

export default {
    props: {
        ratings: { // 要维护的评论列表数组
            type: Array,
            default () {
                return [];
            }
        },
        selectType: { // 选择类型
            type: Number,
            default: ALL
        },
        onlyContent: { // 是否只显示有内容的评论
            type: Boolean,
            default: false
        },
        desc: { // 默认显示的分类名称
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
    @import '../../common/stylus/index.styl';
    .ratingselect
        .rating-type
            padding:18px 0
            margin:0 18px
            border-1px(rgba(7,17,27,0.1))
            font-size:0
            .block
                display: inline-block
                font-size:12px
                padding:8px 12px
                margin-right:8px
                border-radius:1px
                color: rgb(77,85,93)
                line-height :16px
                &.active
                    color: #fff
                .count
                    margin-left: 2px
                    font-size:8px
                &.positive
                    background :rgba(0,160,220,0.2)
                    &.active
                        background :rgb(0,160,220)
                &.negative
                    background :rgba(77,85,93,0.2)
                    &.active
                        background :rgb(77,85,93)
        .switch
            padding: 12px 18px
            line-height:24px
            border-bottom:1px solid rgba(7,17,27,0.1)
            color: rgb(147,153,159)
            font-size:0
            &.on
                .icon-dui
                    color: #00c850
            .icon-dui
                display: inline-block
                vertical-align: middle
                margin-right: 4px
                font-size:24px
            .text
                display: inline-block
                vertical-align: middle
                font-size:12px
</style>
