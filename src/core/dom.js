// класс обработки Html тегов, классов
export class Dom {
    constructor(selector) {
     //   this.$$listener={} // для прослушивания (удаления), т.к. весь контекст здесь
        this.$el=typeof selector==='string' ?
            document.querySelector(selector) :  // если selector-'string', то получаем его
            selector
    }

  html(html) {
    if (typeof html==='string') {
        this.$el.innerHTML=html // html не пустой (как Setter)
        return this  // Патерн Chain, чтобы clear() на базовом
    }
    return this.$el.outerHTML.trim() // html пустой (как Getter)  trim()-удаляет лишние пробелы
  }

  clear() {
        this.html('') // вызываем метод html(html) выше
      return this  // чтобы clear() на базовом
  }

  append(node) {
        if (node instanceof Dom) {
            node=node.$el  // если node из Dom то присваиваем ее в node
        }

      if (Element.prototype.append) {
          this.$el.append(node) // ParentNode.append
      } else {
          this.$el.appendChild(node)
      }
      return this
  }

  on(eventType, callBack) { // Вешаем событие eventType-строка,callBack- функция
    // this.$$listener[eventType]=callBack // при реализации в DomListener теряем контекст и при удалении получаем другой callBack, поэтому здесь сохраняем его
      this.$el.addEventListener(eventType, callBack) // реализация в DomListener
  }
  of(eventType, callBack) { // удаляем событие
      // this.$el.removeEventListener(eventType, this.$$listener[eventType] ) // при реализации в DomListener теряем контекст и при удалении получаем другой callBack, поэтому здесь сохраняем его}
      this.$el.removeEventListener(eventType, callBack)
  }
}


export function $(selector) { // объект Dom
    return new Dom(selector)
}

$.create = (tagName, classes='') => {  // метод создания Html тегов с классами
    const el=document.createElement(tagName) // создаем тег
    if (classes) {
        el.classList.add(classes) // создаем класс если есть
    }
    return $(el) // оборачиваем в Dom, чтобы пустить по классу дом и работали его методы
}