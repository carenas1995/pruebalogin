import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pages', loadChildren: () => import('./pages/principal.module').then(m => m.PrincipalModule), pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
