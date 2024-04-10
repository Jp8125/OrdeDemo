import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { preventGuard } from './guards/prevent.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [  
  { path: '', redirectTo: 'login',pathMatch:'full' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[authGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[authGuard,adminGuard] },
  {path:'login',component:LoginComponent,canActivate:[preventGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
