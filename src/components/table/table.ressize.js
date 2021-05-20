import {$} from '@core/dom';

export function resizeHandler($root, event) { // СУЩЕСТВЕННАЯ ОПТИМИЗАЦИЯ  удерживание и перемещении мыши, задаем кординаты куда будет перемещение при нажатии, но не перемищаем постоянно вслед за курсором
    const $resizer=$(event.target) // оборачиваем в DOM
    const $parent=$resizer.closest('[data-type="resizable"]') // получаем по data-type
    const cords=$parent.getCords()  // Получаем кординаты div который будем менять
    const type=$resizer.data.resize // получаем при onMousedown либо col либо row
    const sideProp= type === 'col' ? 'bottom' : 'right'  // если колнки то right, чтобы не писать if
    let value


    $resizer.css({
        opacity: 1,  // для Hover
        [sideProp]: '-5000px', // по условию 'bottom' или 'right' вся длинна курсора для колонок или строк
    })

    document.onmousemove=e => {  // перемещение кнопки мыши, задаем кординаты куда будет перемещение при отпускании, но не перемищаем постоянно вслед за курсором
        if (type==='col') {
            const delta=e.pageX-cords.right  // получаем кординаты измененные после события удерживания(e.pageX)
            value=cords.width+delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta=e.pageY-cords.bottom
            value=cords.height+delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }
    document.onmouseup=()=> { // при отпускании задаем стили с кординатами куда переместиться
        document.onmousemove = null // удаляем событие удерживания
        document.onmouseup = null
        if (type === 'col') {
            $parent.css({width: value + 'px'}) // записываем новую width в div который меняем
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(e => e.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})  // записываем новую height в div который меняем
        }
        $resizer.css({
            opacity: 0, // для Hover
            bottom: 0, // после операции исходное значение относительно которого изменения следующие будут
            right: 0
        })
    }
}
// onMousedown(event) {  // ДЛЯ TABLE изначальный код нажатия мыши и изменения таблицы
/* 1 // console.log(event.target.getAttribute('data-resize')); // event.target получаем элемент на котором событие, getAttribute получаем название data-resize элемента на котором событие
 // console.log(event.target.dataset); // если на елементе есть событие, то получим его {resize: "col"}
   if (event.target.dataset.resize) {
       const $resize=$(event.target) // оборачиваем в DOM
       // const $parent=$resize.$el.parentNode  // получаем родительский элемент который надо изменить, но этот метод не надежный т.к. может быть изменено имя элемента родителя
       // const $parent=$resize.$el.closest('.column') // closest ищет родительский элемент по значению
       const $parent=$resize.closest('[data-type="resizable"]') // получаем по data-type
       // const cords=$parent.$el.getBoundingClientRect()  // получаем кординаты, но получение их в метод  getCords()
       const cords=$parent.getCords()  // Получаем кординаты div который будем менять
       console.log(cords);
       // const cel=$resize.closest(`[data-col="${2}"]`)
       // console.log(cel);
       const type=$resize.data.resize // получаем при onMousedown либо col либо row
       console.log(type);
       document.onmousemove=e => {  // удерживание кнопки мыши
           console.log('mousemove')
           if (type==='col') {
           $resize.$el.style.opacity='1'
           const delta=e.pageX-cords.right  // получаем кординаты измененные после события удерживания(e.pageX)
           $parent.$el.style.width=(cords.width+delta)+'px' // записываем новую width в div который меняем

           const cell=this.$root.findAll(`[data-cell="${$parent.$el.dataset.col}"]`) // получаем все изменяемые колонки и выносим в отдельную переменную

           // document.querySelectorAll(`[data-cell="${$parent.$el.dataset.col}"]`) // получаем колонки в строках по индексу колонки на которой событие
           //     .forEach(e=>e.style.width=(cords.width+delta)+'px') // для каждой полученной колонки изменяем width, как в колонке на которой событие
           //  this.$root.findAll(`[data-cell="${$parent.$el.dataset.col}"]`) // модернизируем
           //      .forEach(e=>e.style.width=(cords.width+delta)+'px')
           cell.forEach(e=>e.style.width=(cords.width+delta)+'px')  // всем присваиваем размер
         } else {
               const delta=e.pageY-cords.bottom
               $parent.$el.style.height=(cords.height+delta)+'px'
           }*/

/* 2 if (event.target.dataset.resize) {
     const $resize=$(event.target) // оборачиваем в DOM
     const $parent=$resize.closest('[data-type="resizable"]') // получаем по data-type
     const cords=$parent.getCords()  // Получаем кординаты div который будем менять
     const type=$resize.data.resize // получаем при onMousedown либо col либо row
     const cell=this.$root.findAll(`[data-cell="${$parent.$el.dataset.col}"]`) // получаем все изменяемые колонки и выносим в отдельную переменную
     document.onmousemove=e => {  // удерживание кнопки мыши
         if (type==='col') {
             $resize.$el.style.opacity='1'
             const delta=e.pageX-cords.right  // получаем кординаты измененные после события удерживания(e.pageX)
             const value=cords.width+delta
             $parent.css({width:value+'px'}) // записываем новую width в div который меняем
             cell.forEach(e=>e.style.width=value+'px')  // всем присваиваем размер
         } else {
             const delta=e.pageY-cords.bottom  // получаем кординаты измененные после события удерживания(e.pageY) для строк
             const value=cords.height+delta
             $parent.css({height: value + 'px'}) // записываем новую height в div который меняем
         }
       }
document.onmouseup=()=>{
 $resize.$el.style.opacity='0'
 document.onmousemove=null // удаляем событие удерживания
}*/