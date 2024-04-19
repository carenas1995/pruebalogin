import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  cargando: boolean;
  columnas: any[] = [];
  listUsuarios: Usuarios[] = [];
  constructor(private router: Router, private userService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.cargando = true;
    this.listUsuarios = [];
    this.columnas = [];
    this.columnas = [
      { field: 'codCli', header: 'codCli', sort: false },
      { field: 'nomCli', header: 'nomCli', sort: false },
      { field: 'tipIde', header: 'tipIde', sort: false },
      { field: 'nitCli', header: 'nitCli', sort: false },
      { field: 'digVer', header: 'digVer', sort: false },
      { field: 'codCiu', header: 'codCiu', sort: false },
      { field: 'codDep', header: 'codDep', sort: false },
      { field: 'codPai', header: 'codPai', sort: false },
      { field: 'di1Cli', header: 'di1Cli', sort: false },
      { field: 'te1Cli', header: 'te1Cli', sort: false },
      { field: 'tipCli', header: 'tipCli', sort: false },
      { field: 'fecIng', header: 'fecIng', sort: false },
      { field: 'eMail', header: 'eMail', sort: false },
      { field: 'ap1Cli', header: 'ap1Cli', sort: false },
      { field: 'nom1Cli', header: 'nom1Cli', sort: false },
      { field: 'tipPer', header: 'tipPer', sort: false },
      { field: 'estCli', header: 'estCli', sort: false },
      { field: 'codCliExtr', header: 'codCliExtr', sort: false },
      { field: 'pagWeb', header: 'pagWeb', sort: false },
      { field: 'accion', header: 'accion', sort: false }
    ];
    this.online(0)
  }

  online(i: number) {
    if (i == 0) {
      var local = sessionStorage.getItem('list');
      if (local == null) {
        this.http.get("../../../assets/data.json").subscribe((data: any[]) => {
          this.listUsuarios = data.sort(function (a, b) {
            return Number(b.codCli) - Number(a.codCli);
          });
          sessionStorage.setItem('list', JSON.stringify(this.listUsuarios));
          setTimeout(() => {
            this.cargando = false;
          }, 2000);
        });
      }
      else {
        var data = JSON.parse(local);
        this.listUsuarios = data.sort(function (a, b) {
          return Number(b.codCli) - Number(a.codCli);
        });
        setTimeout(() => {
          this.cargando = false;
        }, 2000);
      }
    }
    else {
      this.userService.getUsers().subscribe(res2 => {
        this.listUsuarios = res2.sort(function (a, b) {
          return Number(b.codCli) - Number(a.codCli);
        });
        this.cargando = false;
      });
    }
  }

  add() {
    this.router.navigate(['addusuarios']);
  }

  edit(id) {
    this.router.navigate(['editusuarios/' + id]);
  }

}
