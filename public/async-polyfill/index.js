/* eslint-disable */
(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.polyfillLoader = factory();
    }
})(this, function () {
    // 支持的属性
    var FEATURES = [
        'Map',
        'Object.assign',
        'Promise',
        'Set',
        'Symbol'
    ];

    var FEATURES_EXTENDS = {
        Map: function () {
            new Map([['key', true]]);
        }
    };

    // 空函数
    var loop = function () { };
    /**
     * 数组是否包含元素
     * @param ele 元素
     * @param array {Array} 数组
     * @returns {Boolean}
     */
    var arrayContains = function (ele, array) {
        return array.indexOf(ele) > -1;
    };

    /**
     * 检测浏览器是否支持该属性
     * @param feature {String} 属性名
     * @returns {Boolean}
     */
    var isBrowserSupport = function (feature) {
        var target = feature.replace(/[\*\/]/g, ''),
            targetArr;
        if (arrayContains('.', feature) > -1) {
            targetArr = feature.split('.');
        } else {
            targetArr = [feature];
        }

        return checkQueue(targetArr);
    };

    /**
     * 检测属性
     * @param targetArr {Array} 属性名组
     * @returns {Boolean}
     */
    var checkQueue = function (targetArr) {
        var parent = window;
        for (var i = 0, max = targetArr.length; i < max; i++) {
            var target = targetArr[i];
            if (FEATURES_EXTENDS[target]) {
                try {
                    FEATURES_EXTENDS[target]();
                } catch (err) {
                    return false;
                }
            }
            if (target in parent && !!parent[target]) {
                parent = parent[target];
            } else {
                return false;
            }
        }

        return true;
    };

    var defaultPolyfillUrl = function (features, url) {
        var names = [];
        for (var i = 0, len = features.length; i < len; i++) {
            names.push(features[i].toLowerCase());
        }
        return url + names.join('_') + '.js';
    };

    var createPolyfillioUrl = function (features, url) {
        var baseParams = '?type=js&flags=always,gated&features=',
            featureLists = features.join(',');
        return url + baseParams + featureLists;
    };

    /**
     * 加载cdn polyfill资源
     * @param unSuppertFeatures {Array} 浏览器不支持的属性
     * @param callback {Function} 浏览器不支持的属性
     * @param _polyfillUrl {String}
     */
    var fetchPolyfill = function (opts, callback) {
        var features = opts.features || [],
            _polyfillUrl = opts._polyfillUrl,
            urlGenerator = opts.urlGenerator;

        if (features.length) {
            var url = !_polyfillUrl ? '//cdn.polyfill.io/v2/polyfill.min.js' : _polyfillUrl,
                generator = !_polyfillUrl ? createPolyfillioUrl : (urlGenerator ? urlGenerator : defaultPolyfillUrl),
                polyfillUrl = generator(features, url);

            callback({
                src: polyfillUrl,
                type: 'text/javascript'
            });

        } else {
            callback();
        }
    };

    var srciptReq = function srciptReq(defines, onSuccess, onError) {
        var onLoaded = 'onPolyfillLoaded' + new Date().getTime(),
            onLoadError = 'onPolyfillError' + new Date().getTime();

        window[onLoaded] = onSuccess || loop;
        window[onLoadError] = onError || loop;

        try {
            var script = document.createElement('script');
            script.src = defines.src;
            var scriptHtml = script.outerHTML;
            var arr = scriptHtml.split(' ');

            arr.splice(1, 0, "onload=\"" + onLoaded + "('" + script.src + "')\"", "onerror=\"" + onLoadError + "('" + script.src + "')\"");
            document.write(arr.join(' '));
        } catch (err) {
            console.log(err);
        }
    };

    var loadEntry = function (options) {
        var polyfillSuccess = options.polyfillSuccess || loop,
            polyfillError = options.polyfillError || loop;

        return function (polyfillJs) {
            if (!polyfillJs) {
                return;
            }

            srciptReq(polyfillJs, polyfillSuccess, polyfillError);
        };
    };

    function polyfillLoader(options) {
        var callback = loadEntry(options),
            features = (options.features && options.features.length) ? options.features.sort() : FEATURES,
            unSuppertFeatures = [];

        for (var i = 0, max = features.length; i < max; i++) {
            var feature = features[i],
                isSupprt = isBrowserSupport(feature);

            if (arrayContains(feature, FEATURES) && !isSupprt) {
                unSuppertFeatures.push(feature);
            }
        }

        fetchPolyfill({
            features: unSuppertFeatures,
            _polyfillUrl: options._polyfillUrl,
            urlGenerator: options.urlGenerator
        }, callback);
    };

    polyfillLoader({
        _polyfillUrl: '//11.url.cn/now/polyfill/',
        polyfillSuccess: function (src) { console.log("polyfillSuccess", src) },
        polyfillError: function (src) { console.log("polyfillError", src) },
        defineSuccess: function (src) { console.log("defineSuccess", src) },
        defineError: function (src) { console.log("defineError", src) }
    });
});
