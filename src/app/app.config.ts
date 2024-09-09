import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
/*1.3.2 Creación de proyecto frontend y consumo de API REST ::  La constante appConfig va como parametro en el main.ts de 
la aplicacion.*/
export const appConfig: ApplicationConfig = 
{
  providers: 
  [
    provideRouter(routes)
    , provideAnimationsAsync()
    /*1.3.1 Creación de proyecto frontend y consumo de API REST :: Para que una clase servicio pueda realizar peticiones http 
  (para este caso, conectarse con la capa controlador del backend) hay que habilitar esa opcion. Para eso ponemos esta funcion:*/
    , provideHttpClient()
  ]
};
