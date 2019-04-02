// 这里定义全局的过滤器
export let formatDate = time => { // 时间格式化过滤器
    if (time) {
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
};
