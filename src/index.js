// import './module'
import './scss/index.scss'
import {Excel} from '@/components/excel/Excel';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Headers} from '@/components/headers/Headers';

const excel=new Excel('#app', {
    components: [Headers, Toolbar, Formula, Table]
})

excel.render()