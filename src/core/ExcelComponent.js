import {DomListener} from '@core/DomListener';


export class ExcelComponent extends DomListener {
    constructor($root, options= {}) { // options передаем- объект из конструктора Headers, Toolbar, Formula, Table
        super($root, options.listeners);
        this.name = options.name || '' // получаем имя объекта

        this.prepare() // переопределим, чтобы вызывался раньше всех в Table для инициализации классов
        this.emmiter=options.emmiter
        this.unsubscribers=[]
    }

    prepare() {}

    toHTML() {// возвращает шаблон компонента
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub=>unsub()) // удаляем слушателей
    }

    $emmit(event, ...args) { // Уведомляем слушателей про событие event
        this.emmiter.emit(event, ...args)
    }

    $on(event, fn) { // подписываемся на событие event
        const unsub=this.emmiter.subscribe(event, fn)
        this.unsubscribers.push(unsub) // для удаления подписки
    }
}