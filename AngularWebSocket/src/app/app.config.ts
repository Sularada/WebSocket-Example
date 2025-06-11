import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SocketIoModule, SocketIoConfig, provideSocketIo } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideRouter(routes),
    // provideSocketIo(config) 'v17 de yok'
  ]
};
