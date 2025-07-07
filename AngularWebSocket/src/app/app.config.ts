import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MessageService } from 'primeng/api';



const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };



export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideRouter(routes),
    provideAnimationsAsync(),
    MessageService,
    // provideSocketIo(config) 'v17 de yok'
  ]
};
