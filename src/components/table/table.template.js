const CODS={A:65, Z:90} // приводим буква к числовому значению


// function createCell(i, col) { // добавляем индекс для изменения размера(событие onmousemove)
//     return `
//      <div class="cel " contenteditable="" data-row="${i}" data-cell="${col}"></div>
//     `
// }

function createCell(i) { // i-  строки  // index(колонки)
    return function(_, index) {
        return `
        <div class="cel " contenteditable="" data-type="cell" data-col="${index}" data-cell="${i}:${index}"></div>
        `
    }
}

// eslint-disable-next-line no-unused-vars
function createCol(el, index) {  // создаем колонки  //col-resize изменение размера колонок // добавляем индекс для изменения размера(событие onmousemove)// data-resize="col" устанавливаем название для функционала, для JS
    return `
    <div class="column"  data-type="resizable" data-col="${index}">
      ${el}
      <div class="col-resize" data-resize="col"></div> 
     </div>
    `
}

function createRow(content, num='') { // создаем строку
  const resize= num!==''?'<div class="row-resize" data-resize="row"></div>':''  // убираем курсор из первой строки
   return `
 <div class="row" data-type="resizable">
   <div class="row-info" >
       ${num}
       ${resize}
   </div>  
   <div class="row-data" data-row="row-da">${content}</div>
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

    rows.push(createRow( cols))  // создаем ПЕРВУЮ строку и в нее кладем сформированные колонки

    for (let i = 0; i < rowsCount; i++) {
        const cell= new Array(colsCount)
            .fill('')
            // .map((_, col)=>createCell(i, col))
            .map(createCell(i))
            .join('')
         rows.push(createRow(cell, i+1  ))
    }
    return rows.join('')
}