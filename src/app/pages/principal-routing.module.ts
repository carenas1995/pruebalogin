import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AddusuarioComponent } from './addusuario/addusuario.component';

const appRoutes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'addusuarios', component: AddusuarioComponent },
  { path: 'editusuarios/:id', component: AddusuarioComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class principalRoutingModule {
}
