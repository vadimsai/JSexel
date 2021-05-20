// import {$} from '@core/dom';

export class TableSelection {
    static className='selected' // для выделения ячейки

    constructor() {
        this.group=[] // массив ячеек
        this.current=null  // текущая ячейка
    }
    select($el) { // выделение ячейки
        this.clear() // удаляем выделение ячейки
         this.group.push($el) // добавляем ячейку в массив
        this.current=$el // получим 0 элемент(при нажатии shift присваиваем первый элемент)
         $el.addClass(TableSelection.className) // Выделяем ячейку, добавляем в имя полученного класса 'selected'
         $el.focus().addClass(TableSelection.className) // элемент на котором фокус выделяем
    }

        clear() { // удаляем выделение ячейки
            this.group.forEach(el=>el.removeClass(TableSelection.className)) // удаляем выделение если есть
            this.group=[]
    }

    selectGroup($group=[]) { // выделение группы ячеек
       this.clear()
        this.group=$group
        this.group.forEach(el=>el.addClass(TableSelection.className))
    }
}
