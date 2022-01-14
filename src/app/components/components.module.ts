import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppChatItemComponent } from './app-chat-item/app-chat-item.component';
import { AppChatGroupComponent } from './app-chat-group/app-chat-group.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AppChatFooterComponent } from './app-chat-footer/app-chat-footer.component';
import { FormsModule } from '@angular/forms';
import { AppChatHeaderComponent } from './app-chat-header/app-chat-header.component';
import { AppLoadingComponent } from './app-loading/app-loading.component';
import { AppNotificationItemComponent } from './app-notification-item/app-notification-item.component';
import { AppConcursosComponent } from './app-concursos/app-concursos.component';

const COMPONENTS = [
  AppChatItemComponent,
  AppChatGroupComponent,
  AppChatFooterComponent,
  AppChatHeaderComponent,
  AppLoadingComponent,
  AppNotificationItemComponent,
  AppConcursosComponent
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class ComponentsModule { }
