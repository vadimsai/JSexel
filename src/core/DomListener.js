// eslint-disable-next-line no-unused-vars


import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners=[]) {
        if (!$root) {
            throw new Error('No $root provided for DomListener')
        }
     this.$root=$root
        this.listeners=listeners
 }

    initDomListeners() {
        this.listeners.forEach(listener => {
            // eslint-disable-next-line no-unused-vars
            const method=getMethodName(listener)
            if (!this[method]) { // если нет обработки метода в Formula
                throw new Error(`Method ${method} not implement`)
            }
            this[method]=this[method].bind(this) // у this[method] всегда будет этот контекст т.к. при операции теряем контекст(получаем дрю контекст)
            // console.log(this);
            this.$root.on(listener, this[method]) // this[method].bind(this) теряем контекст Formula, поэтому в Bind передаем контекст this
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method=getMethodName(listener)
            this.$root.of(listener, this[method])
        })
    }
}


// eslint-disable-next-line no-unused-vars
function getMethodName(eventName) {
    return 'on' + capitalize(eventName) // Добавляем on к методу
}