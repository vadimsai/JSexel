import {range} from '@core/utils';

export function shoudResize(event) {  // замена if (event.target.dataset.resize)
    return event.target.dataset.resize
}

export function isCell(event) {  // замена if (event.target.dataset.resize)
    return event.target.dataset.cell
}

export function matrix($resize, $current) { // для выделения группы ячеек
    const target=$resize.cell(true) // получаем row и col при нажатии shift
    const current=$current.cell(true) // получаем изначальный(от которого двигаемся) row и col при нажатии shift
    const cols=range(current.col, target.col) // получаем все col для выделения
    const rows=range(current.row, target.row) // получаем все row для выделения
    console.log('Cols:', cols)
    console.log('Rows:', rows);
    return cols.reduce((acc, col)=>{ // объединяем в один массив cols и rows
        rows.forEach(row=>acc.push(`${row}:${col}`)) // добавляем в аккумулятор rows
        return acc
    }, [])// пустой массив для аккумулятора
}

export function nextSelector(event, {col, row}) { // для КЛАВИАТУРЫ получаем следующий элемент по событию
    const MIN_VALUE=0
    switch (event) { // событие
        case 'Enter':  // клавиша
        case 'ArrowDown': row++ // как изменяем
            break
        case 'Tab':
        case 'ArrowRight': col++
            break
        case 'ArrowLeft':
            col=col-1<MIN_VALUE?MIN_VALUE:col-1 // условие, чтобы не выйти за границы
            break
        case 'ArrowUp':
            row=row-1<MIN_VALUE?MIN_VALUE:row-1
            break
    }
    return `[data-cell="${row}:${col}"]` // возвращаем для поиска find()
}