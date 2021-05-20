import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.ressize';
import {isCell, matrix, nextSelector, shoudResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';


export class Table extends ExcelComponent {
    static  className = 'excel__table' // в корневом файле html корневой div с классом названя переменной


    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        // this.unsubs=[] // отписка // но так надо для каждого компонента
    }


    toHTML() {
        return createTable()
    }

    onMousedown(event) { // нажатие на мышку
        if (shoudResize(event)) { // если в поле изменения размера
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {  // если в обычном поле Таблицы
            const $resize = $(event.target)
            if (event.shiftKey) {  // удержание shift для выделения группы ячеек
                const $cells = matrix($resize, this.selection.current)
                    .map(ce => this.$root.find(`[data-cell="${ce}"]`)) // Получим дом(div) елементы, для этого приводим к нашему классу Dom и вызываем find()
                console.log($cells);
                this.selection.selectGroup($cells) // выделяем группу ячеек
            } else {
                this.selection.select($resize)// выделяем одну ячейку
            }
        }
    }


    onKeydown(event) {  // нажатие на клавиатуру
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        // const {key}=event
        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault() // отменяем назначение клавиш
            const id = this.selection.current.cell(true) // получаем изначальный элемент cell с колонками и строками
            const $next = this.$root.find(nextSelector(event.key, id)) // получаем следующий элемент
            this.selectCell($next)
            // this.selection.select($next) // выделяем следующий элемент
            // this.$emmit('table:select', $next) // добавляем событие реализация в Formula, текст из Formula в таблицу
        }
    }


         prepare() { // т.к. вызывается раньше init()
             this.selection=new TableSelection()
         }

    init() { // вызываем т.к. инициализация здесь(выделение ячейки)
            super.init();
            // this.selection=new TableSelection()
            this.selectCell(this.$root.find('[data-cell="0:0"]')) // получаем 0 выделенную ячеку
            // this.selection.select($cell) // добавляем ячейку
            // this.$emmit('table:select', $cell)  // в диве в cell в поле добавляем в формула
            // const unsub=this.emmiter.subscribe('FO', (text)=> { // подписка
            //     this.selection.current.text(text)
             this.$on('formula:input', (text)=> { // подписка
                 this.selection.current.text(text)
        })

        this.$on('formula:keydown', ()=> { // подписка
            this.selection.current.focus()
        })
        // this.unsubs.push(unsub)
        }


    // destroy() {  // но так надо для каждого компонента
    //     super.destroy()
    //     this.unsubs.forEach(unsub => unsub())
    // }

    onInput(event) { // уведомляем слушателей, из formula в ячейку
        this.$emmit('table:input', $(event.target))
    }

    selectCell($cell) {
        this.selection.select($cell) // добавляем ячейку
        this.$emmit('table:select', $cell)  // в диве в cell в поле добавляем в формула
    }
}


/*
if (event.shiftKey) { // для выделения группы ячеек
    const target=$resize.cell(true) // получаем row и col при нажатии shift
    const current=this.selection.current.cell(true) // получаем изначальный(от которого двигаемся) row и col при нажатии shift
    const cols=range(current.col, target.col) // получаем все col для выделения
    const rows=range(current.row, target.row) // получаем все row для выделения
    console.log('Cols:', cols)
    console.log('Rows:', rows);

    const cels=cols.reduce((acc, col)=>{ // объединяем в один массив cols и rows
        rows.forEach(row=>acc.push(`${row}:${col}`)) // добавляем в аккумулятор rows
        return acc
    }, [])// пустой массив для аккумулятора
    console.log(cels);
    const $cells=cels.map(ce=>this.$root.find(`[data-cell="${ce}"]`)) // Получим дом(div) елементы, для этого приводим к нашему классу Dom и вызываем find()
    console.log($cells);
    this.selection.selectGroup($cells) // выделяем
} else {
    this.selection.select($resize)
}
}*/
