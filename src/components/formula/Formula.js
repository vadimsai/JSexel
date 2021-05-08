import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static  className='excel__formula' // в корневом файле html корневой div с классом названя переменной

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']  // событие
        });
    }


    toHTML() {
        return `<div class="info">fx</div>
             <div class="input" contenteditable="true" spellcheck="false"></div>`
    }

    onInput(event) {
        console.log(this.$root);
        console.log(event.target.textContent.trim());
    }
    onClick() {}
}