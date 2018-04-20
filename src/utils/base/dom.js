/**
 * @desc DOM操作函数
 * @author cenjw
 * @version 0.0.1
 */

import EventBus from './eventBus';

const MODULE_NAME = 'dom';
const CONTEXT = 'domCtx';

class Dom extends EventBus {

    _getElement(selector) {
        let element;
        if (selector instanceof HTMLElement) {
            element = selector;
        } else if (typeof selector === 'string') {
            element = document.querySelector(selector);
        }
        return element;
    }

    _hasClass(element, className) {
        const _className = className.trim();
        if (_className.indexOf(' ') !== -1) console.error(`[${MODULE_NAME}] hasClass error: the className contains HTML space characters, which are not valid`);
        if (element.classList) {
            return element.classList.contains(_className);
        } else {
            return element.className.indexOf(_className) !== -1;
        }
    }

    on(type, selector, target, fn) {
        if (typeof selector === 'function') {
            super.on(type, selector);
        } else {
            const _selector = _getElement(selector);
            if (!_selector) {
                console.warn(`[${MODULE_NAME}] on failed: the dom element is not found`);
                return;
            }
            let _fn = fn;
            if (target) {
                const _target = _getElement(target);
                if (_target) {
                    _fn = (e) => {
                        if (_target.contains(e.target)) {
                            fn.apply(this, arguments);
                        }
                    };
                }
            }
            if (document.addEventListener) {
                _selector.addEventListener(type, _fn, false);
            } else {
                _selector.attachEvent(`on${type}`, _fn);
            }
            const _type = `${_selector.nodeName}_${type}`;
            super.add(CONTEXT, _type, _fn);
        }
    }

    one(type, selector, target, fn) {
        let _fn = () => {
            fn.apply(this, arguments);
            off(type, selector, _fn);
        };
        on(type, selector, target, _fn);
    }

    off(type, selector, fn) {
        if (typeof selector === 'function' || typeof selector === 'undefined') {
            super.off(type, selector);
        } else {
            const _selector = _getElement(selector);
            if (!_selector) {
                console.warn(`[${MODULE_NAME}] off failed: the dom element is not found`);
                return;
            }
            if (document.removeEventListener) {
                _selector.removeEventListener(type, fn, false);
            } else {
                _selector.detachEvent(`on${type}`, fn);
            }
            const _type = `${_selector.nodeName}_${type}`;
            super.remove(CONTEXT, _type, fn);
        }
    }

    addClass(selector, className) {
        const _selector = _getElement(selector);
        if (!_selector) {
            console.warn(`[${MODULE_NAME}] addClass failed: the dom element is not found`);
            return;
        }
        const _className = className.trim();
        const _classArr = className.split(' ');
        let curClass = _selector.className;
        _classArr.forEach((cls) => {
            const _cls = cls.trim();
            if (!_cls || _hasClass(_selector, _cls)) return;
            if (_selector.classList) {
                _selector.classList.add(_cls);
            } else {
                curClass += ` ${_cls}`;
            }
        });
        !_selector.classList && (_selector.className = curClass);
    }

    removeClass(selector, className) {
        const _selector = _getElement(selector);
        if (!_selector) {
            console.warn(`[${MODULE_NAME}] removeClass failed: the dom element is not found`);
            return;
        }
        const _className = className.trim();
        const _classArr = className.split(' ');
        let curClass = _selector.className;
        _classArr.forEach((cls) => {
            const _cls = cls.trim();
            if (!_cls || !_hasClass(_selector, _cls)) return;
            if (_selector.classList) {
                _selector.classList.remove(_cls);
            } else {
                curClass.replace(_cls, '');
            }
        });
        !_selector.classList && (_selector.className = curClass.trim());
    }

}

export default Dom;
