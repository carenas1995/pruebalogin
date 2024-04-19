import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios } from '../interfaces/usuarios';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';


let headers = new HttpHeaders();
headers.set('Content-Type', 'application/json');
headers.set('Access-Control-Allow-Origin', '*');
headers.set('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
headers.set('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
const httpOptions = {
  headers: headers
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private masterService = 'https://test.novasoft.com.co:8091/WebAPI/api/';

  constructor(private httpClient: HttpClient) {

  }

  login(user: User) {
    return this.httpClient.post(this.masterService + 'Cuenta/Login', user, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
        'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
      }
    }).pipe(map(res => res as any));
  }

  async refreshtoken(user: User) {
    var intentos = (sessionStorage.getItem('intentos') != null && sessionStorage.getItem('intentos') != undefined && sessionStorage.getItem('intentos') != "") ? Number(sessionStorage.getItem('intentos')) : 0;
    var validtoken = localStorage.getItem('token') != null && localStorage.getItem('token') != undefined && localStorage.getItem('token') != "";
    if (intentos < 3 && intentos >= 0) {
      intentos = intentos + 1;
      sessionStorage.setItem('intentos', intentos + "");
      if (validtoken) {
        localStorage.removeItem('token');
        const intento = await this.login(user).subscribe(res => {
          localStorage.setItem('token', res.token);
          return true;
        },
          err => {
            return false;
          });
        return intento;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  getUsers() {
    const headers = { 'Authorization': localStorage.getItem('token') };
    const httpOptions = {
      headers: headers
    }
    return this.httpClient.get(this.masterService + 'CXC/Senior/Accounts', httpOptions).pipe(map(res => res as Usuarios[]));
  }

  getUser(id: number) {
    const headers = { 'Authorization': localStorage.getItem('token') };
    const httpOptions = {
      headers: headers
    }
    return this.httpClient.get(this.masterService + 'CXC/Senior/Accounts/' + id, httpOptions).pipe(map(res => res as Usuarios));
  }

  adduser(usuario: Usuarios) {
    const headers = { 'Authorization': localStorage.getItem('token') };
    const httpOptions = {
      headers: headers
    }
    return this.httpClient.post(this.masterService + 'CXC/Senior/Accounts', usuario, httpOptions).pipe(map(res => res as Usuarios));
  }

  edituser(usuario: Usuarios) {
    const headers = { 'Authorization': localStorage.getItem('token') };
    const httpOptions = {
      headers: headers
    }
    return this.httpClient.put(this.masterService + 'CXC/Senior/Accounts', usuario, httpOptions).pipe(map(res => res as Usuarios));
  }
}
