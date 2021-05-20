export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1) // первая буква заглавная + удаляем первую маленькую букву иначе дублирование
}

export function range(start, end) { // для выделения группы ячеек
    if (start>end) { // т.к. вычитаем, то делаем дестрктуризацию с присвоением наоборот
        [end, start]=[start, end]
    }
    return new Array(end-start+1) // получаем диапозон ячеек
        .fill('')
        .map((_, index)=>start+index)
}