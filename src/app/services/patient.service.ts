/*1.2.2 Creación de proyecto frontend y consumo de API REST :: La funcion de esta clase es  consumir un servicio http del 
backend. Su plantilla (estructura) base se creo con el comando:
ng generate service [nombre de la clase]
o su forma abreviada
ng g s [nombre de la clase]
Y si quiero que no se me genere el archivo de prueba
ng g s [nombre de la clase] --skip-tests

                                                                            <--> model
El orden de comunicacion entre capas en el frontEnd es: pages <--> services <--> backend 
                                                              <--> model
El backend no es una capa del frontend*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*1.2.1 Creación de proyecto frontend y consumo de API REST ::  Como aqui se quiere usar la clase Patient, entonces se debe 
de importar su archivo (con su ruta relativa) q lo contiene.*/
import { Patient } from '../model/patient';
/*2.2.1 Creando la plantilla principal del proyecto frontend :: Cuando se quiera trabajar con el archivo de constantes globales de otro
ambiente, no es necesario cambiar esta linea de codigo, ya que al momento de compilar el proyecto, se puede indicar con el comando 
de compilacion con qué archivo de ambiente va a trabajar la aplicacion y esta linea cambiará automaticamente.. */
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

/*1.6 Creación de proyecto frontend y consumo de API REST :: Si quiero que una clase hecha por el usuario sea inyectable, debe de
tener esta anotacion.*/
@Injectable({
  providedIn: 'root'
})
export class PatientService {
/*2.2.2 Creando la plantilla principal del proyecto frontend :: Aqui estoy invocando a la constante HOST del ambiente de 
desarrollo, ya que así esta definido en el import {environment} from ... lineas arriba. */
  private url: string = `${environment.HOST}/patients`;

  /* 6.1 Uso de subjects :: Se crea el observable*/
  private  patientChange: Subject<Patient[]> = new Subject<Patient[]>();
  
  /*1.4.1 Creación de proyecto frontend y consumo de API REST :: Asi es como inyecto en TypeScript un atributo: declaro el atributo 
  y lo encierro en un constructor. */
  constructor(private http: HttpClient) { }

  findAll()
  {
    /*1.4.2 Creación de proyecto frontend y consumo de API REST :: Aqui estoy consumiendo un endpoint RestFul de tipo
    get del backend*/
    return this.http.get<Patient[]>(this.url);
  }

  findById(id : number)
  {
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient: Patient)
  {
    return this.http.post(this.url, patient);
  }

  update(id: number, patient: Patient)
  {
    return this.http.put(`${this.url}/${id}`, patient);
  }

  delete(id: number)
  {
    return this.http.delete(`${this.url}/${id}`);
  }


  setPatientChange(data: Patient[])
  {
    this.patientChange.next(data);
  }

  getPatientChange()
  {
    return this.patientChange.asObservable();
  }
}
