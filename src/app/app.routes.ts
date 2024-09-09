import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './login/login.component';

/*2.3.1 Creando la plantilla principal del proyecto frontend :: Este es un archivo que almacena reglas de navegacion (url). 
En angular 17 por defecto ya viene creado, sin embargo en anteriores versiones al momento de crear el proyecto, se te 
preguntaba si querias generar este archivo.
En este proyecto hay 2 archivos de reglas de navegacion, este y el app/pages/pages.routes.ts . Este se ha creado para almacenar
las reglas de navegacion de la capa externa de la aplicacion como la del logueo, recuperacion de contraseña, ...
Y el pages.routes.ts es para almacenar los componentes de la capa interna de la aplicacion como patient, medic, ...
Las reglas de navegacion se leen asi, por ejm para la 1era regla: la clase del componente encargada de la subUrl '' (y la url seria
 localhost:4200) y cuyo componente padre es app, es LoginComponent. 
 La 2da regla se lee asi: la clase del componente encargada de la subUrl 'login' ( y la url seria localhost:4200/login ) 
 y cuyo componente padre es app, es LoginComponent.*/
export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},

    /*2.3.2 Creando la plantilla principal del proyecto frontend :: En este caso, en la cual la regla posee el campo loadChildren,
    'pages' es un prefijo de suburl padre y funciona en conjunto con otro sufijo de suburl hijo que 
    se encuentra en otro archivo de regla de navegacion hijo. 
    En este caso, el archivo hijo tiene ruta relativa './pages/pages.routes' y en este por ejm existe la clase componente
    PatientComponent, entonces armando esta regla para este componente, se leeria asi: 
    La clase PatientComponent, cuyo componente es patient y cuyo contenido html irá incrustrado en su 
    componente padre app y cuya subUrl del componente hijo patient es 'pages/patient' (pages es el prefijo de la subUrl que
    esta definido aqui en el campo path y patient es el sufijo que esta definido en el registro pagesRoutes, el cual esta definido 
    en el archivo con ruta relativa './pages/pages.routes' y tambien esta indicado en este archivo, en el metodo then)
    (y la url completa seria localhost:4200/pages/patient) es PatientComponent*/
    {path: 'pages'
    /*2.3.3 Creando la plantilla principal del proyecto frontend :: En este caso, en la cual la regla posee el campo loadChildren,
    la pagina html del componente LayoutComponent será incrustrada en cada pagina html de cada componente hijo del componente 
    padre app, definidos en el registro pagesRoutes dentro del archivo con ruta relativa que se encuentra como parametro del
    metodo import.*/
    , component: LayoutComponent
    , loadChildren: () => import('./pages/pages.routes').then((x) => x.pagesRoutes )
    }
];
