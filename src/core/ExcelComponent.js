
// eslint-disable-next-line no-unused-vars
import {DomListener} from '@core/DomListener';


export class ExcelComponent extends DomListener {
    constructor($root, options= {}) { // options передаем- объект из конструктора Headers, Toolbar, Formula, Table
        super($root, options.listeners);
        this.name=options.name || '' // получаем имя объекта
    }


    toHTML() {// возвращает шаблон компонента
        return ''
    }

    init() {
        console.log(`ExcelComp--------  ${this.$root}`)
        this.initDomListeners()
    }
    destroy() {
        this.removeDomListeners()
    }
}