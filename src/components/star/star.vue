<!--显示星级组件-->
<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :key="itemClass.index" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    const CLS_ON = 'on';// 默认满星的名称
    const CLS_HALF = 'half';// 默认半星的名称
    const CLS_OFF = 'off';// 默认无星的名称

    export default {
        props: {
            size: {
                type: Number// 星星尺寸大小
            },
            score: {
                type: Number// 分数
            },
            starNum: {
                type: Number, // 默认星星总数
                default: 5// 默认值
            }
        },
        computed: {
            starType () {
                return 'star-' + this.size;
            },
            itemClasses () {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;// 小数部分是否超过 0.5 是否需要显示半星
                let hasDecimal = score % 1 !== 0;// 是否有小数部分
                let integer = Math.floor(this.score);// 整数部分
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < this.starNum) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/index.styl';
    sizes = 24 36 48
    .star
        font-size: 0
        .star-item
            display: inline-block
            background-repeat :no-repeat
            &:last-child
                margin-right :0
    for size in sizes
        {'.star-' + size}
            span
                &.on
                    bg-image('star' + size + '_on')
                &.half
                    bg-image('star' + size + '_half')
                &.off
                    bg-image('star' + size + '_off')
        &.star-24
            span
                width : 10px
                height :10px
                background-size :10px 10px
                margin-right:3px
        &.star-36
            span
                width : 15px
                height :15px
                background-size :15px 15px
                margin-right:6px
        &.star-48
            span
                width : 20px
                height :20px
                background-size :20px 20px
                margin-right:22px
</style>
