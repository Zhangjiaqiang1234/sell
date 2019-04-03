<!--这是一个 food 的购买数量组件-->
<template>
    <div class="cartcontrol">
        <!--减少按钮-->
        <transition>
            <div class="cart-decrease" v-show="this.food.count>0" @click.stop.prevent="decreaseCart">
                <div class="inner">
                    <i class="iconfont icon-jian"></i>
                </div>
            </div>
        </transition>
        <!--购买数量-->
        <div class="cart-count" v-show="this.food.count>0">{{this.food.count}}</div>
        <!--增加按钮-->
        <div class="cart-add" @click.stop.prevent="addCart"> <!--阻止事件冒泡-->
            <i class="iconfont icon-jia"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart () { // 添加商品数量方法
            event.stopPropagation();
            if (this.food.count) {
                this.food.count++;
            } else {
                Vue.set(this.food, 'count', 1);
            }
            // 把事件对象传出去
            let el = (event.target.nodeName === 'DIV') ? event.target : event.target.parentNode;
            this.$emit('add-cart', el);
        },
        decreaseCart () { // 减少商品数量方法
            if (this.food.count > 0) {
                this.food.count--;
            }
        }
    },
    created () {
    }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.cartcontrol
    font-size: 0
    .cart-decrease
        display :inline-block
        padding :6px
        transition: all 0.4s linear
        .inner
            display: inline-block
            font-size:24px
            line-height 24px
            color: rgb(0,160,220)
        &.v-enter-to
            opacity :1
            transform :translate3d(0,0,0)
            .inner
                transition :all 0.4s linear
                transform :rotate(0)
        &.v-enter,&.v-leave-active
            opacity :0
            transform :translate3d(24px,0,0)
            .inner
                transform :rotate(180deg)
    .cart-count
        display :inline-block
        font-size:10px
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 30px
        text-align: center
        color: rgb(147,153,159)
    .cart-add
        display :inline-block
        padding :6px
        font-size:24px
        line-height 24px
        color: rgb(0,160,220)
</style>
