/** Class for rendering html by data and rendering CallBack function
* @param data - объект или объекты данных из которых нужно срендерить их визуальное представление
* @param renderer - функция колбэк, производящая рендер данных из data
* @param selector - указывает куда нужно произвести вствку срендеренного html
*/
export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderingItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderingItems.forEach((item) => this._renderer(item));
  }

  setItem(element) {
    this._container.append(element);
  }
}
