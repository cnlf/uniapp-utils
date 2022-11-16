export default {
    /**
     * 节流原理：在一定时间内，只能触发一次
     * @param {Function} func 要执行的回调函数
     * @param {Number} wait 延时的时间
     * @param {Boolean} immediate 是否立即执行
     * @return null
     */
    throttle(func, wait = 500, immediate = true) {
        if (immediate) {
            if (!this.flag) {
                this.flag = true;
                // 如果是立即执行，则在wait毫秒内开始时执行
                typeof func === 'function' && func();
                this.timer = setTimeout(() => {
                    this.flag = false;
                }, wait);
            }
        } else {
            if (!this.flag) {
                this.flag = true
                // 如果是非立即执行，则在wait毫秒内的结束处执行
                this.timer = setTimeout(() => {
                    this.flag = false
                    typeof func === 'function' && func();
                }, wait);
            }

        }
    },

    /**
     * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
     * @param {Function} func 要执行的回调函数
     * @param {Number} wait 延时的时间
     * @param {Boolean} immediate 是否立即执行
     * @return null
     */
    debounce(func, wait = 500, immediate = false) {
        // 清除定时器
        if (this.timeout !== null) clearTimeout(this.timeout);
        // 立即执行，此类情况一般用不到
        if (immediate) {
            var callNow = !this.timeout;
            this.timeout = setTimeout(function () {
                this.timeout = null;
            }, wait);
            if (callNow) typeof func === 'function' && func();
        } else {
            // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
            this.timeout = setTimeout(function () {
                typeof func === 'function' && func();
            }, wait);
        }
    },

    /**
     * 获取平台名称
     * @return {string} 平台名称
     */
    getPlatform() {
        let platform;
        switch (process.env.VUE_APP_PLATFORM) {
            case 'app-plus':
                let n = uni.getSystemInfoSync().platform.toLowerCase();
                if (n === 'ios') {
                    platform = 'ios';
                } else if (n === 'android') {
                    platform = 'android';
                } else {
                    platform = 'app';
                }
                break;
            case 'mp-weixin':
                platform = 'wx';
                break;
            case 'mp-alipay':
                platform = 'alipay';
                break;
            case 'mp-baidu':
                platform = 'baidu';
                break;
            case 'mp-qq':
                platform = 'qq';
                break;
            case 'mp-toutiao':
                platform = 'toutiao';
                break;
            case 'quickapp-webview':
                platform = 'kuai';
                break;
        }

        return platform;
    },

    /**
     * 数组去重
     * @param {Array} array 数值
     * @retrun {Array} 数值
     */
    arrayShuffle(array) {
        let i = array.length, t, j;
        while (i) {
            j = Math.floor(Math.random() * i--);
            t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
        return array;
    },
}
