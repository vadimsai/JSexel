import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static  className='excel__table' // в корневом файле html корневой div с классом названя переменной

    toHTML() {
        return createTable()
    }
}