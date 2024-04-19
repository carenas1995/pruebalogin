import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { principalRoutingModule } from './principal-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AddusuarioComponent } from './addusuario/addusuario.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataTableModule } from 'primeng/datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    principalRoutingModule, FormsModule,
    DataTableModule, TableModule, DropdownModule, ReactiveFormsModule],
  declarations: [
    UsuariosComponent,
    AddusuarioComponent,
  ],
  providers: [
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule { }
