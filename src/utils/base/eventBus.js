/**
 * @desc 事件总线
 * @author cenjw
 * @version 0.0.1
 */

const MODULE_NAME = 'eventBus';
const CONTEXT = 'eventCtx';

const events = {};

export function add(ctx, type, fn) {
    !events[ctx] && (events[ctx] = {});
    !events[ctx][type] && (events[ctx][type] = []);
    fn._event_id = events[ctx][type].length;
    events[ctx][type].push(fn);
};

export function remove(ctx, type, fn) {
    if (!events[ctx] || !events[ctx][type] || events[ctx][type].length === 0) return;
    if (typeof fn === 'function') {
        let index = -1;
        events[ctx][type].forEach((func, i) => {
            func._event_id === fn._event_id && (index = i);
        });
        if (index > -1) {
            events[ctx][type].splice(index, 1);
        } else {
            console.warn(`[${MODULE_NAME}] remove failed: the handler is not found in eventBus`);
        }
    } else {
        events[ctx][type] = [];
    }
};

export function trigger(ctx, type, args) {
    if (!events[ctx] || !events[ctx][type] || events[ctx][type].length === 0) {
        console.warn(`[${MODULE_NAME}] trigger failed: the handler of '${type}' event is not found`);
        return;
    }
    events[ctx][type].forEach((func) => {
        func.apply(this, args);
    });
};

export function on(type, fn) {
    add(CONTEXT, type, fn);
};

export function one(type, fn) {
    const func = () => {
        fn.apply(this, arguments);
        off(type, func);
    }
    add(CONTEXT, type, func);;
};

export function off(type, fn) {
    remove(CONTEXT, type, fn);
};

export function emit(type, args) {
    trigger(CONTEXT, type, args);
};

