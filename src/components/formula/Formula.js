import {ExcelComponent} from '@core/ExcelComponent';
// eslint-disable-next-line no-unused-vars
import {nextSelector} from '@/components/table/table.functions';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static  className='excel__formula' // в корневом файле html корневой div с классом названя переменной

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],  // событие
            ...options
        });
    }


    toHTML() {
        return `<div class="info">fx</div>
             <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>`
    }

    onInput(event) {
        // const text=event.target.textContent.trim()
        // this.emmiter.emit('FO', text)
        this.$emmit('formula:input', $(event.target).text())
    }

    onKeydown(event) {  // нажатие на клавиатуру
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emmit('formula:keydown')
        }
    }

    init() {
        super.init();
        this.$formula=this.$root.find('#formula')
        this.$on('table:select', cel=>{ // текст из Formula в таблицу
                this.$formula.text(cel.text())
        })
        this.$on('table:input', cel=>{ // текст из таблицу в Formula
            this.$formula.text(cel.text())
        })
    }
}