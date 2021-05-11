import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.ressize';
import {shoudResize} from '@/components/table/table.functions';


export class Table extends ExcelComponent {
    static  className='excel__table' // в корневом файле html корневой div с классом названя переменной

    constructor(props) {
        super(props, {
            name:'Table',
            listeners: ['mousedown']
        })
    }


    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (shoudResize(event)) {
             resizeHandler(this.$root, event)
          }
        }
}