<!-- 当前组件是用于优惠信息的小图标组件 -->
<template>
    <span :style="{width:size+'px', height:size+'px'}" class="cover-icon" :class="classMap[index]"></span>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            index: {
                type: Number, // 这是确定某个图标的下标 decrease 或 discount
                default: 0// 默认值
            },
            sub: {
                type: Number,
                default: 1// 这是确定采用哪个图片组的下标 _1@2x.png 或 _2@2x.png
            },
            size: {
                type: Number,
                default: 12 // 优惠信息的小图标的默认宽高是12px
            }
        },
        data () {
            return { // 减 折 特 票 保
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            };
        },
        created () {
            let sub = this.sub;
            this.classMap = this.classMap.map(function (item) {
                return item + sub;
            });
        }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl';
classMaps = 'decrease' 'discount' 'special' 'invoice' 'guarantee'
.cover-icon
    display :inline-block
    background-size: 100%
    background-repeat :no-repeat
    vertical-align :top
for map in classMaps
    {'.' + map + '1'}
        bg-image(map + '_1')
for map in classMaps
    {'.' + map + '2'}
        bg-image(map + '_2')
for map in classMaps
    {'.' + map + '3'}
        bg-image(map + '_3')
</style>
