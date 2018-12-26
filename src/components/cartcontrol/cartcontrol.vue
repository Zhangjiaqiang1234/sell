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
    @import 'cartcontrol.styl';
</style>
