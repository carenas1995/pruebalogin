import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  /**
   * Mensaje por defecto(Información)
   * @type {Message}
   */
  msgs: Message[] = [];
  /**
   * Mensaje por defecto(Adición)
   * @type {Message}
   */
  msgAdd: Message = { severity: 'success', summary: 'Éxito', detail: 'Registro agregado correctamente.' };
  /**
   * Mensaje por defecto(Actualización)
   * @type {Message}
   */
  msgUpdate: Message = { severity: 'success', summary: 'Éxito', detail: 'Registro actualizado correctamente.' };
  /**
   * Mensaje por defecto(Error)
   * @type {Message}
   */
  msgError: Message = { severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };

  /**
   * Busqueda para ciertas tablas
   * @type {any[]}
   */
  arraySearch: any[] = [{ id: '', strSearch: '' }];

  /**
   * Observable para los mensajes
   * @type {Subject<Message>}
   */
  subject = new Subject<Message[]>();

  /**
   * Observable para los mensajes
   * @type {Subject<Message>}
   */
  subjectToast = new Subject<Message[]>();
  /**
   * Observable string streams
   */
  getMessage$ = this.subject.asObservable();
  /**
  * Observable string streams
  */
  getMessageToast$ = this.subjectToast.asObservable();
  /**
   * Directorio de mensajes
   * @type {Array}
   */
  /**
   * Tab específico que se quiera seleccionar al regresar a una pantalla
   * @type {any}
   */
  _navTab: any;
  /**
   * Bandera para filtos
   * @type {[{ id: '', filters: [ { filter: '', value: '' } ] }]}
   */
  arrayFilter: any[] = [{ id: '', filters: [{ filter: '', value: '' }] }];

  /**
   * Observable para el avatar
   * @type {Subject<string>}
   */
  avatar = new Subject<string>();

  /**
   * Observable avatar
   */
  getAvatar$ = this.avatar.asObservable();


  static carInicial: boolean;

  /**
   * Construye la instancia
   */
  constructor() {
  
  }

  /**
   * asignar mensaje para notificar al usuario
   * @param {number} type
   * @param {Message} msgCustom
   * @param {boolean} hide
   */
  setMesage(type: number, msgCustom: Message = null, hide = true) {
    this.msgs = [];
    switch (type) {
      case 1:
        this.msgs.push(this.msgAdd);
        break;
      case 2:
        this.msgs.push(this.msgUpdate);
        break;
      case 3:
        this.msgs.push(this.msgError);
        break;
      default:
        this.msgs.push(msgCustom);
        break;
    }
  }

  /**
   * Recibe la búsqueda
   * @param {string} id
   * @param {string} strSearch
   */
  setSearch(id: string, strSearch: string) {
    if (this.arraySearch.find(c => c.id === id)) {
      this.arraySearch.find(c => c.id === id).strSearch = strSearch;
    } else {
      this.arraySearch.push({ id: id, strSearch: strSearch });
    }
  }

  /**
   * Recibe y guarda el número de Tab
   * @param {any} numero
   */
  setTab(numero: any) {
    this._navTab = numero;
  }

  /**
   * Recibe los filtros
   * @param {string} id
   * @param {string} filter
   * @param {any} value
   */
  setFilters(id: string, filter: string, value: any) {
    const data = this.arrayFilter.find(x => x.id === id);
    if (data) {
      const filtro = data.filters.find(y => y.filter === filter);
      if (filtro) {
        filtro.value = value;
      } else {
        data.filters.push({ filter: filter, value: value });
      }
    } else {
      // const filtro2 = { filter: filter, value: value };
      this.arrayFilter.push({ id: id, filters: [{ filter: filter, value: value }] });
    }
    const d = this.arrayFilter;
  }

  /**
   * Asigna el avatar.
   * @param {string} avatar
   */
  setAvatar(avatar: string) {
    this.avatar.next(avatar);
  }

  /**
   * Retorna la búsqueda
   * @param {string }id
   * @returns {string}
   */
  getSearch(id: string) {
    if (this.arraySearch.find(c => c.id === id)) {
      return this.arraySearch.find(c => c.id === id).strSearch;
    } else {
      return '';
    }
  }

  /**
   * Retorna el Tab
   * @returns {any}
   */
  getTab() {
    return this._navTab;
  }

  /**
   * Retorna un filtro en específico
   * @param {string} id
   * @param {string} filter
   * @returns {any}
   */
  getFilter(id: string, filter: string): any {
    const data = this.arrayFilter.find(x => x.id === id);
    if (data) {
      const temp = data.filters.find(s => s.filter === filter);
      if (temp) {
        return temp.value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Retorna todos los filtros
   * @param {string} id
   * @param {string} filter
   * @returns {Any}
   */
  getFilters(id: string): any {
    const data = this.arrayFilter.find(x => x.id === id);
    if (data) {
      return data.filters;
    } else {
      return null;
    }
  }


  /**
   * Limpia el filtro
   */
  resetFilter() {
    this.arrayFilter = [];
  }
Zz

  actualizarCargaInicial(valor: boolean) {
    NavService.carInicial = valor;
  }

  retornarCargaInicial() {
    return NavService.carInicial;
  }

  setMesageToast(msgCustom: Message, hide: boolean = true) {
    this.subjectToast.next([msgCustom]);
  }



}
