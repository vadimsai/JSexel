const CODS={A:65, Z:90} // приводим буква к числовому значению


// eslint-disable-next-line no-unused-vars
function createCell() {
    return `
     <div class="cel" contenteditable=""></div>
    `
}

// eslint-disable-next-line no-unused-vars
function createCol(el) {  // создаем колонки
    return `
    <div class="col">${el}</div>
    `
}

function createRow(content, num='') { // создаем строку
   return `
 <div class="row">
   <div class="row-info">${num}</div>
   <div class="row-data">${content}</div>
 </div>  
   `
}

function toChar(_, index) { // неиспользуемый параметр так помечаем _ , нужен чтобы получить доступ к index
    return String.fromCharCode(CODS.A+index)
}


export  function createTable(rowsCount = 21) {
    // eslint-disable-next-line no-unused-vars
    const colsCount=CODS.Z-CODS.A+1 // колличество колонок
    const rows=[] // колличество строк

    /* const cols= new Array(colsCount)
        .fill('')// метод fill() позволяет заполнить все элементы массива одним значением
        .map( (el, index) =>{
            return String.fromCharCode(CODS.A+index) // заполняем А=65 + index получаем алфавит и приводим к Буквам
        })
        .map(el=> {
            return creareCol(el) // создаем колонки и кладем каждый элемент в колонку
        })
        .join('')  // убираем запятые пробелы (приводим к строке)*/

    const cols= new Array(colsCount)
        .fill('')
        .map(toChar) // вынесли преобразование в отдельную функцию
        .map(createCol) // т.к. передаем один параметр УПРОЩАЕМ
        .join('')

    const cell= new Array(colsCount)
        .fill('').map(createCell).join('')

    rows.push(createRow(cols))  // создаем ПЕРВУЮ строку и в нее кладем сформированные колонки

    for (let i = 0; i < rowsCount; i++) {
         rows.push(createRow(cell, i+1))
    }
    console.log(cols);
    return rows.join('')
}