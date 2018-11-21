/**
 * Created by Administrator on 2018/9/5.
 */
// 这是一个公共的JS库，在这里定义全局方法
export default{
    install (Vue, options) {
        Vue.prototype.getEle = (str) => { // 通过选择器获取单个dom节点
            return document.querySelector(str);
        };
        Vue.prototype.getEles = (str) => { // 通过选择器获取dom节点数组
            return document.querySelectorAll(str);
        };
    }
};
