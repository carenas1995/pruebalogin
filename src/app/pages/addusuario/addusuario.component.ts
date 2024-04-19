import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from 'src/app/services/nav.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})
export class AddusuarioComponent implements OnInit {

  tittle: string = "";
  cargando: boolean = true;
  usuario: Usuarios = new Usuarios();
  listUsuarios: Usuarios[] = [];
  valonline = false;
  constructor(private confirmationService: ConfirmationService, private route: ActivatedRoute, private router: Router, private userService: AuthService, private http: HttpClient, private navServicio: NavService) { }

  ngOnInit() {
    this.cargando = true;
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.tittle = "Editar Usuario";
        this.online(0, true, params['id']);
      } else {
        this.tittle = "Agregar Usuario";
        this.usuario = new Usuarios();
        this.online(0, false);
      }
    });
  }

  online(i: number, val: boolean, params?: number) {
    this.valonline = (i == 0) ? true : false;
    if (i == 0) {
      if (val) {
        var local = sessionStorage.getItem('list');
        if (local == null) {
          this.http.get("../../../assets/data.json").subscribe((data: any[]) => {
            data = data.sort(function (a, b) {
              return Number(b.codCli) - Number(a.codCli);
            });
            this.listUsuarios = data;
            var first = data.find(x => x.codCli == (params + ""));
            this.usuario = first;
            setTimeout(() => {
              this.cargando = false;
            }, 2000);
          });
        }
        else {
          var data = JSON.parse(local);
          data = data.sort(function (a, b) {
            return Number(b.codCli) - Number(a.codCli);
          });
          this.listUsuarios = data;
          var first = data.find(x => x.codCli == (params + ""));
          this.usuario = first;
          setTimeout(() => {
            this.cargando = false;
          }, 2000);
        }
      }
      else {
        var local = sessionStorage.getItem('list');
        if (local == null) {
          this.http.get("../../../assets/data.json").subscribe((data: any[]) => {
            data = data.sort(function (a, b) {
              return Number(b.codCli) - Number(a.codCli);
            });
            this.listUsuarios = data;
            var first = data[0];
            this.usuario.codCli = (Number(first.codCli) + 1) + "";
            setTimeout(() => {
              this.cargando = false;
            }, 2000);
          });
        }
        else {
          var data = JSON.parse(local);
          data = data.sort(function (a, b) {
            return Number(b.codCli) - Number(a.codCli);
          });
          this.listUsuarios = data;
          var first = data[0];
          this.usuario.codCli = (Number(first.codCli) + 1) + "";
          setTimeout(() => {
            this.cargando = false;
          }, 2000);
        }
      }
    }
    else {
      if (val) {
        this.userService.getUser(params).subscribe(res => {
          this.usuario = res;
          this.cargando = false;
        });
      }
      else {
        this.userService.getUsers().subscribe(res2 => {
          var data = res2.sort(function (a, b) {
            return Number(b.codCli) - Number(a.codCli);
          });
          var first = data[0];
          this.usuario.codCli = (Number(first.codCli) + 1) + "";
          this.cargando = false;
        });
      }
    }
  }

  back() {
    this.router.navigate(['usuarios']);
  }

  submit() {
    if (this.valonline) {
      sessionStorage.removeItem('list');
      this.listUsuarios.push(this.usuario);
      sessionStorage.setItem('list', JSON.stringify(this.listUsuarios));
      setTimeout(() => {
        this.router.navigate(['usuarios']);
        this.cargando = false;
      }, 2000);
    }
    else {
      this.userService.adduser(this.usuario).subscribe(res => {
        this.navServicio.setMesage(1);
        this.router.navigate(['usuarios']);
      });
    }
  }

}
