import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})
export class AddusuarioComponent implements OnInit {

  tittle: string = "";
  cargando: boolean = true;
  usuario: Usuarios = new Usuarios();
  constructor(private route: ActivatedRoute, private router: Router, private userService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.cargando = true;
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.tittle = "Editar Usuario";
        this.http.get("../../../assets/data.json").subscribe((data: any[]) => {
          var first = data.sort(function (a, b) {
            return Number(b.codCli) - Number(a.codCli);
          });
          this.usuario = first.find(x => x.codCli == params['id']);
          setTimeout(() => {
            this.cargando = false;
          }, 2000);
        });
        /*this.userService.getUser(params['id']).subscribe(res => {
          this.usuario = res;
          this.cargando = false;
        });*/
      } else {
        this.tittle = "Agregar Usuario";
        this.usuario = new Usuarios();
        this.http.get("../../../assets/data.json").subscribe((data: any[]) => {
          var first = data.sort(function (a, b) {
            return Number(b.codCli) - Number(a.codCli);
          });
          this.usuario = first[0].codCli + 1;
          setTimeout(() => {
            this.cargando = false;
          }, 2000);
          /*this.userService.getUsers().subscribe(res2 => { 
            var data = res2.sort(function (a, b) {
              return Number(b.codCli) - Number(a.codCli);
            });
            this.usuario = data[0].codCli + 1;
            this.cargando = false;
          });*/
        });
      }
    });
  }

  back() {
    this.router.navigate(['usuarios']);
  }

  submit() {
    this.router.navigate(['usuarios']);
  }

}
