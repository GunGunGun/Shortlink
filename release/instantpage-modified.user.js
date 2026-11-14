// ==UserScript==
// @name              Web accelerator
// @namespace         https://github.com/syhyz1990/instantpage
// @version           1.4.3
// @author            YouXiaoHou
// @description       自动帮你加速网页中的超链接，加快打开网页的速度，实测符合条件的网页打开速度减少50%以上。
// @updateURL         https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/instantpage-modified.meta.js
// @downloadURL       https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/instantpage-modified.user.js
// @license           AGPL
// @homepage          https://www.youxiaohou.com/tool/install-instantpage.html
// @supportURL        https://github.com/syhyz1990/instantpage
// @require           https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @resource          swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @match             *://*/*
// @noframes
// @run-at            document-idle
// @grant             GM_openInTab
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// @icon              data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMCA3OWMwLTM1LjQgMjguNS02NCA2My45LTY0LjFzNjQuMSAyOC42IDY0LjEgNjRjMCA5LjQtMi4xIDE4LjQtNS43IDI2LjUtMSAyLjMtMi4zIDQuNi0zLjYgNi43LS40LjYtMSAxLTEuNyAxSDExYy0uNyAwLTEuMy0uNC0xLjctMS0xLjMtMi4yLTIuNS00LjQtMy42LTYuN0MyLjEgOTcuNCAwIDg4LjQgMCA3OXptMjQuNC0zOS43Yy01LjIgNS4xLTkuMiAxMS4xLTEyIDE3LjgtMyA2LjktNC41IDE0LjItNC41IDIxLjhhNTUuODYgNTUuODYgMCAwIDAgNC40IDIxLjhjLjcgMS42IDEuNCAzLjIgMi4yIDQuN2g5OC44Yy44LTEuNSAxLjYtMy4xIDIuMi00LjdhNTUuODYgNTUuODYgMCAwIDAgNC40LTIxLjggNTUuODYgNTUuODYgMCAwIDAtNC40LTIxLjhjLTIuOC02LjctNi45LTEyLjctMTItMTcuOC01LjEtNS4yLTExLjEtOS4yLTE3LjgtMTJhNTUuODYgNTUuODYgMCAwIDAtMjEuOC00LjQgNTUuODYgNTUuODYgMCAwIDAtMjEuOCA0LjRjLTYuNiAyLjgtMTIuNiA2LjgtMTcuNyAxMnoiIGZpbGw9IiM0NDQiLz48cGF0aCBkPSJNMTIuNCA1Ny4xYzIuOC02LjcgNi45LTEyLjcgMTItMTcuOCA1LjEtNS4yIDExLjEtOS4yIDE3LjgtMTJBNTUuODYgNTUuODYgMCAwIDEgNjQgMjIuOWE1NS44NiA1NS44NiAwIDAgMSAyMS44IDQuNGM2LjcgMi44IDEyLjcgNi45IDE3LjggMTIgNS4yIDUuMSA5LjIgMTEuMSAxMiAxNy44YTU1Ljg2IDU1Ljg2IDAgMCAxIDQuNCAyMS44IDU1Ljg2IDU1Ljg2IDAgMCAxLTQuNCAyMS44Yy0uNyAxLjYtMS40IDMuMi0yLjIgNC43SDE0LjZjLS44LTEuNS0xLjYtMy4xLTIuMi00LjdBNTUuODYgNTUuODYgMCAwIDEgOCA3OC45Yy0uMS03LjYgMS40LTE0LjkgNC40LTIxLjh6IiBmaWxsPSIjNjQ5OTUwIi8+PHBhdGggZD0iTTc3LjUgNjAuOUM2OCA4MS4yIDY0LjkgODQuNiA2NC42IDg1Yy0xLjUgMS41LTMuNSAyLjMtNS42IDIuM3MtNC4xLS44LTUuNi0yLjNhNy45MSA3LjkxIDAgMCAxIDAtMTEuMmMuMy0uNCAzLjgtMy40IDI0LjEtMTIuOXptMC04Yy0xLjEgMC0yLjMuMi0zLjQuOEM2My4yIDU4LjggNTEgNjQuOSA0Ny44IDY4LjFjLTYuMiA2LjItNi4yIDE2LjMgMCAyMi41IDMuMSAzLjEgNy4yIDQuNyAxMS4yIDQuN3M4LjEtMS42IDExLjItNC43YzMuMi0zLjIgOS4zLTE1LjQgMTQuNC0yNi4zIDIuNi01LjYtMS43LTExLjQtNy4xLTExLjR6TTYzLjkgMjkuOGMtMjcuMiAwLTQ5LjUgMjIuNi00OS4xIDQ5LjggMCAzLjYuNSA3LjIgMS4zIDEwLjYuNCAxLjggMiAzLjEgMy45IDMuMSAyLjYgMCA0LjQtMi40IDMuOS00LjktLjctMy0xLjEtNi4yLTEuMS05LjNBNDIuMDQgNDIuMDQgMCAwIDEgMjYgNjNjMi01IDUtOS40IDguOC0xMy4yUzQzIDQzLjEgNDcuOSA0MWE0Mi4wNCA0Mi4wNCAwIDAgMSAzMi4yIDBjNC45IDIuMSA5LjMgNS4xIDEzLjEgOC45Qzk3IDUzLjYgOTkuOSA1OCAxMDIgNjNhNDIuMDQgNDIuMDQgMCAwIDEgMy4yIDE2LjFjMCAzLjItLjQgNi4zLTEuMSA5LjMtLjYgMi41IDEuMyA0LjkgMy45IDQuOSAxLjggMCAzLjUtMS4zIDMuOS0zLjEuOC0zLjYgMS4zLTcuMyAxLjMtMTEuMSAwLTI3LjMtMjIuMS00OS4zLTQ5LjMtNDkuM3oiIGZpbGw9IiM0NDQiLz48L3N2Zz4=
// ==/UserScript==

(function () {
    'use strict';

    let util = {
        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        },

        include(str, arr) {
            str = str.replace(/[-_]/ig, '');
            for (let i = 0, l = arr.length; i < l; i++) {
                let val = arr[i];
                if (val !== '' && str.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    return true;
                }
            }
            return false;
        },

        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            doc.head.appendChild(style);
        },

        reg: {
            chrome: /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            chromeNew: /^https?:\/\/chromewebstore.google.com\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            edge: /^https?:\/\/microsoftedge.microsoft.com\/addons\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            firefox: /^https?:\/\/(reviewers\.)?(addons\.mozilla\.org|addons(?:-dev)?\.allizom\.org)\/.*?(?:addon|review)\/([^/<>"'?#]+)/,
            microsoft: /^https?:\/\/(?:apps|www).microsoft.com\/(?:store|p)\/.+?\/([a-zA-Z\d]{10,})(?=[\/#?]|$)/,
        }
    };

    let main = {
        initValue() {
            let value = [{
                name: 'setting_success_times',
                value: 0
            }, {
                name: 'allow_external_links',
                value: true
            }, {
                name: 'allow_query_links',
                value: true
            }, {
                name: 'enable_store_link',
                value: false
            }, {
                name: 'enable_target_self',
                value: true
            }, {
                name: 'enable_animation',
                value: false
            }, {
                name: 'delay_on_hover',
                value: 65
            }, {
                name: 'exclude_list',
                value: ''
            }, {
                name: 'exclude_keyword',
                value: 'login\nlogout\nregister\nsignin\nsignup\nsignout\npay\ncreate\nedit\ndownload\ndel\nreset\nsubmit\ndoubleclick\ngoogleads\nexit'
            }];

            value.forEach((v) => {
                util.getValue(v.name) === undefined && util.setValue(v.name, v.value);
            });
        },

        registerMenuCommand() {
            
            GM_registerMenuCommand('⚙️ Settings', () => {
                let dom = `<div style="font-size: 1em;">
                              <label class="instant-setting-label">Accelerate external links<input type="checkbox" id="S-External" ${util.getValue('allow_external_links') ? 'checked' : ''} class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label"><span>Accelerate links with parameters <a href="https://www.youxiaohou.com/tool/install-instantpage.html#%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E">See more</a></span><input type="checkbox" id="S-Query" ${util.getValue('allow_query_links') ? 'checked' : ''} 
                              class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Accelerate Extension/App Store Link <input type="checkbox" id="S-Store" ${util.getValue('enable_store_link') ? 'checked' : ''} class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Accelerate links open on the current page<input type="checkbox" id="S-Target" ${util.getValue('enable_target_self') ? 'checked' : ''} class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Animation effects when Accelerated<input type="checkbox" id="S-Animate" ${util.getValue('enable_animation') ? 'checked' : ''} 
                              class="instant-setting-checkbox"></label>
                              <label class="instant-setting-label">Delay (milliseconds)<input type="number" min="65" id="S-Delay" value="${util.getValue('delay_on_hover')}" 
                              class="instant-setting-input"></label>
                              <label class="instant-setting-label-col">Exclude by URLs <textarea placeholder="One domain per line, Example: www.google.com" id="S-Exclude" class="instant-setting-textarea">${util.getValue('exclude_list')}</textarea></label>
                              <label class="instant-setting-label-col">Exclude by Keywords <textarea placeholder="One keyword per line, Example: logout" id="S-Exclude-Word" class="instant-setting-textarea">${util.getValue('exclude_keyword')}</textarea></label>
                            </div>`;
                Swal.fire({
                    title: 'Configuration',
                    html: dom,
                    showCloseButton: true,
                    confirmButtonText: 'Save',
                    footer: '<div style="text-align: center;font-size: 1em;">Click to view <a href="https://www.youxiaohou.com/tool/install-instantpage.html" target="_blank">instructions</a>，free and open source，Powered by <a href="https://www.youxiaohou.com">油小猴</a></div>',
                    customClass: {
                        popup: 'instant-popup',
                    },
                }).then((res) => {
                    if (res.isConfirmed) {
                        history.go(0);
                    }
                });

                document.getElementById('S-External').addEventListener('change', (e) => {
                    util.setValue('allow_external_links', e.currentTarget.checked);
                });
                document.getElementById('S-Query').addEventListener('change', (e) => {
                    util.setValue('allow_query_links', e.currentTarget.checked);
                });
                document.getElementById('S-Store').addEventListener('change', (e) => {
                    util.setValue('enable_store_link', e.currentTarget.checked);
                });
                document.getElementById('S-Target').addEventListener('change', (e) => {
                    util.setValue('enable_target_self', e.currentTarget.checked);
                });
                document.getElementById('S-Animate').addEventListener('change', (e) => {
                    util.setValue('enable_animation', e.currentTarget.checked);
                });
                document.getElementById('S-Delay').addEventListener('change', (e) => {
                    util.setValue('delay_on_hover', e.currentTarget.value);
                });
                document.getElementById('S-Exclude').addEventListener('change', (e) => {
                    util.setValue('exclude_list', e.currentTarget.value);
                });
                document.getElementById('S-Exclude-Word').addEventListener('change', (e) => {
                    util.setValue('exclude_keyword', e.currentTarget.value);
                });
            });
        },

        //在排除名单里
        inExcludeList() {
            let exclude = util.getValue('exclude_list').split('\n');
            let host = location.host;
            return exclude.includes(host);
        },

        //加速主代码
        instantPage() {
            if (window.instantLoaded) return;
            let mouseoverTimer;
            let lastTouchTimestamp;
            const prefetches = new Set();
            const prefetchElement = document.createElement('link');
            const isSupported = prefetchElement.relList && prefetchElement.relList.supports && prefetchElement.relList.supports('prefetch')
                && window.IntersectionObserver && 'isIntersecting' in IntersectionObserverEntry.prototype;
            const isOnline = () => window.navigator.onLine;
            const allowQueryString = 'instantAllowQueryString' in document.body.dataset || util.getValue('allow_query_links');
            const allowExternalLinks = 'instantAllowExternalLinks' in document.body.dataset || util.getValue('allow_external_links');
            const useWhitelist = 'instantWhitelist' in document.body.dataset;
            const mousedownShortcut = 'instantMousedownShortcut' in document.body.dataset;
            const DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION = 1111;
            const enableAnimation = util.getValue('enable_animation');
            const enableTargetSelf = util.getValue('enable_target_self');
            const enableStoreLink = util.getValue('enable_store_link');
            window.instantLoaded = true;
            const excludeKeyword = util.getValue('exclude_keyword').split('\n');

            let delayOnHover = util.getValue('delay_on_hover');
            let useMousedown = false;
            let useMousedownOnly = false;
            let useViewport = false;

            if ('instantIntensity' in document.body.dataset) {
                const intensity = document.body.dataset.instantIntensity;

                if (intensity.substr(0, 'mousedown'.length) === 'mousedown') {
                    useMousedown = true;
                    if (intensity === 'mousedown-only') {
                        useMousedownOnly = true;
                    }
                } else if (intensity.substr(0, 'viewport'.length) === 'viewport') {
                    if (!(navigator.connection && (navigator.connection.saveData || (navigator.connection.effectiveType && navigator.connection.effectiveType.includes('2g'))))) {
                        if (intensity === "viewport") {
                            if (document.documentElement.clientWidth * document.documentElement.clientHeight < 450000) {
                                useViewport = true;
                            }
                        } else if (intensity === "viewport-all") {
                            useViewport = true;
                        }
                    }
                } else {
                    const milliseconds = parseInt(intensity);
                    if (!Number.isNaN(milliseconds)) {
                        delayOnHover = milliseconds;
                    }
                }
            }

            if (isSupported) {
                const eventListenersOptions = {
                    capture: true,
                    passive: true,
                };

                if (!useMousedownOnly) {
                    document.addEventListener('touchstart', touchstartListener, eventListenersOptions);
                }

                if (!useMousedown) {
                    document.addEventListener('mouseover', mouseoverListener, eventListenersOptions);
                } else if (!mousedownShortcut) {
                    document.addEventListener('mousedown', mousedownListener, eventListenersOptions);
                }

                if (mousedownShortcut) {
                    document.addEventListener('mousedown', mousedownShortcutListener, eventListenersOptions);
                }


                if (useViewport) {
                    let triggeringFunction;
                    if (window.requestIdleCallback) {
                        triggeringFunction = (callback) => {
                            requestIdleCallback(callback, {
                                timeout: 1500,
                            });
                        };
                    } else {
                        triggeringFunction = (callback) => {
                            callback();
                        };
                    }

                    triggeringFunction(() => {
                        const intersectionObserver = new IntersectionObserver((entries) => {
          