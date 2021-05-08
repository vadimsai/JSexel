import {$} from '@core/dom';

export class Excel {
    constructor(selector, options) {  // new Excel('#app', {component: [Headers, Toolbar, Formula, Table]
        this.$el= $(selector) // делаем елемент instance Dom класса, чтобы append возвращал //this.$el=document.querySelector(selector)
        this.components=options.components || [] // внимательней с параметрами, ошибки в названии
    }

    getRoot() {
        const $root=$.create('div', 'excel') // создаем корневой елемент(реализация метода в dom.js)

       /*  const $root=document.createElement('div') // создаем корневой елемент
        $root.classList.add('excel')  // добавили класс т.к. он в корне всех остальных классов в Html*/
        /* $root.textContent='Test'
        $root.style.fontSize='4rem'*/

            this.components= this.components.map(Compon => { // у каждого класса(компонента) вызываем метод toHTML() и добавляем в Html
            /* const $el=document.createElement('div') // добавляем елемент для каждого, класса
            $el.classList.add(Compon.className) // добавляем нязвание класса(static  className) из html*/
            const $el=$.create('div', Compon.className) // создаем тег с классом для каждого элемента массива  ($- создает объект Dom)
            const component=new Compon($el) // создаем у каждого элемента массива(Headers, ...) new Component(т.к. элементы массива - классы)

             //    // Дебаг для removeDomListeners
             // if (component.name) {
             //     window['c'+component.name]=component
             // }

            $el.html(component.toHTML())  // $el.innerHTML=component.toHTML() // добавляем в Html, то что в методе
            $root.append($el) // добавляем то что получилось в $root
            // $root.insertAdjacentHTML('afterbegin', component.toHTML()) // добавляем в Html
             return component // возвращаем обновленный т.к. MAP
            })
        return $root
    }

    render() { // весь конткст будет в Dom
       // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`) // добавляем Html тег
       //  const node=document.createElement('h1')  // другой вариант добавляем Html тег
       //  node.textContent='Test'
        this.$el.append(this.getRoot())  // создаем Html элемент в методе getRoot

        this.components.forEach(compon => compon.init()) // прослушываем события для каждого компонента, после append
    }
}