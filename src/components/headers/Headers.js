import {ExcelComponent} from '@core/ExcelComponent';

export class Headers extends ExcelComponent {
    static  className='excel__header' // в корневом файле html корневой div с классом названя переменной

    toHTML() {
        return `<input type="text" class="input" value="Новая таблица"/>

    <div>
      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>`
    }
}