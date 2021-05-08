export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1) // первая буква заглавная + удаляем первую маленькую букву иначе дублирование
}