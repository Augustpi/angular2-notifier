/**
 * Angular2 Notifer
 *
 * Avni Onur Pehlivan https://github.com/Augustpi
 * https://github.com/Augustpi/angular2-notifier
 *
 */

export class Notifier {

  type: string;
  title: string;
  content: string;
  container: HTMLElement;
  duration: number;
  counter: number;

  constructor(  type: string, title: string, content: string, duration: number) {
      this.type = type,
      this.title = title,
      this.content = content,
      this.duration = duration
  }

  show(): void {
      this.container = this.createContainer();
      this.createNotification(this.type, this.title, this.content, this.container, this.duration);
  }

  createContainer(): HTMLElement {
      var nc = document.getElementById("notifier-container");
      if (nc !== null) {
          this.counter = nc.children.length + 1;
          return document.getElementById("notifier-container");
        } else {
          var element = this._creteElement("div", this.setMap({'id':'notifier-container', 'class':'notify container'}));
          document.body.appendChild(element);
          return document.getElementById("notifier-container");
      }
  }

  createNotification(type: string, title: string, content: string, container: Element, duration: number): void {
      var itemId = 'notifier-item-' + this.counter;
      var itemEl = this._creteElement('div', this.setMap({ 'class': 'notify item ' + type, 'id': itemId }));
      var titleEl = this._creteElement('div',  this.setMap({'class': 'header'}));
      var contentEl = this._creteElement('div', this.setMap({ 'class': 'content' }));
      var clsEl = this._creteElement('div', this.setMap({'class': 'close-btn' }));
      var iconEl = this._creteElement('div', this.setMap({'class': 'img img-' + type}));

      titleEl.innerHTML = title;
      contentEl.innerHTML = content;
      clsEl.innerHTML = 'x';

      itemEl.appendChild(clsEl);
      itemEl.appendChild(titleEl);
      itemEl.appendChild(iconEl);
      itemEl.appendChild(contentEl);
      container.appendChild(itemEl);

      clsEl.addEventListener("click", (e) => {
        this.closeNotification(itemId);
      }, false);

      setTimeout(() => {
          this.container.classList.add("z");
          itemEl.classList.add("show-notifier");
      }, 100);


      if (this.duration > 0) {
          setTimeout(() => {
              this.closeNotification(itemId);
          }, duration);
      }
  }

  closeNotification(currentEl: string): void {
      document.getElementById(currentEl).classList.remove("show-notifier");
      setTimeout(() => {
          document.getElementById(currentEl).remove();
      }, 600);
      setTimeout(() => {
          this.removeZ();
      }, 630);
  }

  removeZ(): void {
      if (document.getElementById("notifier-container").children.length === 0)
      document.getElementById("notifier-container").classList.remove("z");
  }

  setMap(obj: Object = {}): Map<string, string> {
      var map: Map<string, string> = new Map<string, string>();
      for (let member in obj) {
          map.set(member, obj[member]);
      }
      return map;
  }

  _creteElement(el: string, attrs: Map<string, string>): Element {
      var element = document.createElement(el);
      attrs.forEach((name, value) => {
        element.setAttribute(value, name);
      });
      return element;
  }
}
