import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient';
import { NgFor } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  /*1.8 Creación de proyecto frontend y consumo de API REST :: Para que funcione el comportamiento *ngFor solamente en la pagina 
  patient.component.html, debo de activarlo en esta, su correspondiente pagina patient typescript.*/
  /*3.5 Listando en Angular Material table :: Hay que importar en este componente RouterOutlet para poder usar su etiqueta en su
  pagina html.*/
  /*3.7 Listando en Angular Material table :: Hay que importar en este componente RouterLink para poder usar su etiqueta en su
  pagina html.*/
  imports: [NgFor, MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
/*1.5.1 Creación de proyecto frontend y consumo de API REST :: Si se quiere que al momento de cargarse una incrustracion html de este
componente en otro componente, se cargue por ejm todos los pacientes haciendo una peticion http, eso debo de hacerlo en el metodo
ngOnInit (tambien se debe de declarar que implemente la interfaz OnInit). Como ya se estableció en false el strict en el archivo
tsconfig.json, ya no es necesario tipificar el tipo de dato de retorno de la funcion ngOnInit() y en general, de ninguna funcion.*/
export class PatientComponent implements OnInit{

/*1.5.2 Creación de proyecto frontend y consumo de API REST :: Aqui se esta inyectando PatientService. */
  constructor(private patientService : PatientService){}

  dataSource: MatTableDataSource<Patient>;
  /*3.1 Listando en Angular Material table :: Esta es la lista de identificadores de columna. */
  displayedColumns: string[] = ['idPatient', 'firstname', 'lastName', 'dni', 'actions'];

  ngOnInit() 
  {
/*1.5.3 Creación de proyecto frontend y consumo de API REST :: Para mas informacion de programacion reactiva ver el directorio en : 
Java\Spring boot\Programacion Reactiva*/
    this.patientService.findAll().subscribe( data => this.dataSource = new  MatTableDataSource(data) );

    /* 6.2 Uso de subjects :: El getPatientChange() retorna el observable. Dentro del subscribe lo que pasa es que se 
    agrega (subscribe) la funcion lambda a la lista de funciones gestoras de eventos del observable.*/
    this.patientService.getPatientChange().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }


  applyFilter(e:any)
  {

  }

}
