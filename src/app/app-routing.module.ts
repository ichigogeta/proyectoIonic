import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'idiomas', pathMatch: 'full' },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'details', loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)},
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
  { path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)},
  { path: 'cover-page', loadChildren: () => import('./pages/cover-page/cover-page.module').then( m => m.CoverPagePageModule)},
  { path: 'chats', loadChildren: () => import('./pages/chats/chats.module').then( m => m.ChatsPageModule)},
  { path: 'interior-chat/:id_chat/:nombre_chat/:ultimo_mensaje', loadChildren: ()=> import('./pages/interior-chat/interior-chat.module').then (m => m.InteriorChatPageModule)},
  { path: 'idiomas', loadChildren: () => import('./pages/idiomas/idiomas.module').then( m => m.IdiomasPageModule)},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
