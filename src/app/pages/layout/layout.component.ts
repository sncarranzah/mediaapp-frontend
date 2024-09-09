import { Component } from '@angular/core';
/*2.6.1 Creando la plantilla principal del proyecto frontend :: Se importa el modulo, indicando su clase y su ruta relativa*/
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { PatientComponent } from '../patient/patient.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  /*2.6.2 Creando la plantilla principal del proyecto frontend :: Aqui tambien se importa el mismo  modulo, indicando su clase.*/
  imports: [MaterialModule, RouterLink, RouterOutlet, RouterLinkActive, NgIf, PatientComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  logout()
  {

  }

}
