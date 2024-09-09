import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*2.5.3 Creando la plantilla principal del proyecto frontend :: todos estas instrucciones import las he obtenido de la pagina web de
angular material. Angular Material por defecto es responsive.*/
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


/*2.5.1 Creando la plantilla principal del proyecto frontend :: Este archivo es un modulo. Un modulo es un archivo que es capaz 
de agrupar modulos y/o componentes para luego ser exportados o importados. El comando abreviado para crear uno (lo cual 
incluye la creacion de la carpeta con el mismo nombre del modulo automaticamente) es:
ng g module [ruta relativa del modulo]   */

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  /*2.5.2 Creando la plantilla principal del proyecto frontend :: estas clases q se importan a este modulo al comienzo de este archivo 
  tienen que ser exportables con respecto a todos los demas componentes, clases, modulos de la aplicacion a donde se quiera
  importar y que esten ubicados fuera de la carpeta de este modulo. Cada clase equivale a un tipo de componente de angular
  material en el html.*/
  exports:
  [
    MatSidenavModule
    , MatButtonModule
    , MatIconModule
    , MatMenuModule
    , MatDividerModule
    , MatToolbarModule
    , MatTableModule
    , MatPaginatorModule
    , MatSortModule
    , MatFormFieldModule
    , MatInputModule
  ]
})
export class MaterialModule { }
