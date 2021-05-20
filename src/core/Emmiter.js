 export class Emmiter {
    constructor() {
        this.listener= {}
    }

    emit(eventName, ...args) { // уведомляем слушвтеля
        if (!Array.isArray(this.listener[eventName])) { // если не массив
           return  false
        }
        this.listener[eventName].forEach(listener=>
            listener(...args)) // по событие кладем параметры
    }

    subscribe(event, fn) { // Подписываемся на уведомления(добавляем нового слушателя)
        this.listener[event]=this.listener[event] || [] // чтобы не обнулять массив
        this.listener[event].push(fn)
        return ()=>{  // возвращаем удаление события, чтобы не было утечек памяти
            this.listener[event].filter(listener=>listener !== fn)
        }
    }
}

// const e=new Emmiter()
// e.subscribe('vvv', data => console.log('dfs', data))
// e.emit('vvv', 777)