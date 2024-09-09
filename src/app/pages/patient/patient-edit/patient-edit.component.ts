/*3.3 Listando en Angular Material table :: De la misma froma en que se creó los componentes layout, medic, patient ... dentro del
componente app, asi tambien creammos el componente patient-edit dentro del componente patient. Esto sirve para darle orden y
modularizar nuestro proyecto. El comando a ejecutar en la raiz del proyecto seria:  ng g c pages/patient/patient-edit --skip-tests */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { NgIf } from '@angular/common';
import { Patient } from '../../../model/patient';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  /*4.2.1 Trabajando con Formularios en Angular :: Para trabajar con formularios en la seccion html de un componente, hay que 
  importar la clase de formularios en el respectivo archivo ts del componente. */
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent implements OnInit
{

  formG: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
/*4.6.1 Trabajando con Formularios en Angular :: La variable que recupera los parametros de la url, se tiene que inyectar */
    private route: ActivatedRoute,
    private router : Router,
    private patientService: PatientService
  ){}

  ngOnInit(): void
  {
    /*4.2.2 Trabajando con Formularios en Angular :: aqui defino los campos que va a tener el formulario*/
    this.formG = new FormGroup({
      idPatient: new FormControl(0),
      /*5.1 Validación de formularios :: Aqui se está definiendo las reglas de validacion de los campos del formulario de paciente. 
      Validators.required significa que es un campo obligatorio. */
      firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      address: new FormControl('',  [Validators.required, Validators.minLength(150)]),
      phone: new FormControl('',  [Validators.required, Validators.minLength(9)]),
      email: new FormControl('',  [Validators.required, Validators.email])
    });
    /*4.6.2 Trabajando con Formularios en Angular :: En este caso se está recuperando el parametro "id" de la url.*/
    this.route.params.subscribe(data =>
    {
      this.id = data['id'];
      //console.log('El id es: : %d', this.id);
      this.isEdit = this.id != null;
      if (this.isEdit) this.editForm();
    });
  }


  editForm()
  {
    this.patientService.findById(this.id).subscribe(data =>
    {
      this.formG = new FormGroup({
        idPatient: new FormControl(data.idPatient),
        firstName: new FormControl(data.firstName,[Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
      dni: new FormControl(data.dni, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      address: new FormControl(data.address,  [Validators.required, Validators.minLength(150)]),
      phone: new FormControl(data.phone,  [Validators.required, Validators.minLength(9)]),
      email: new FormControl(data.email,  [Validators.required, Validators.email])
      });
    });
  }

  /*5.3 Validación de formularios :: Este es el accesor.*/
  get f()
  {
    return this.formG.controls;
  }

  operate()
  {
    const patient: Patient = new Patient();
    patient.idPatient = this.formG.value['idPatient'];
    patient.firstName = this.formG.value['firstName'];
    patient.lastName = this.formG.value['lastName'];
    patient.dni = this.formG.value['dni'];
    patient.address = this.formG.value['address'];
    patient.phone = this.formG.value['phone'];
    patient.email = this.formG.value['email'];
    //console.log('el nuevo nombre es %s', patient.firstName);
    if (this.isEdit)
    {
      /*6.3.1 Uso de subjects :: Esta rama del if es para actualizar. Esta es la forma No Ideal de hacer, porque el anidamiento que 
      se forma hace dificil de entender y de mantener a futuro.*/
      console.log('linea 99 :: el id es: %d', this.id);
      this.patientService.update(this.id, patient).subscribe(() => {
        console.log('linea 101 :: nombre de paciente: %s', patient.firstName);
        this.patientService.findAll().subscribe(data => {
/* 6.3.2 Uso de subjects :: Con setPatientChange(data), el mismo observable del paso anterior emite (notifica) un evento con su
respectiva "data" de evento para que sea manejada por la funcion gestora (el observador) de evento del observable que se 
subscribió en el paso anterior. */
          this.patientService.setPatientChange(data);
        })
      });
    }
    else //insert
    {
/*6.3.3 Uso de subjects :: Esta rama del if es para insertar. Esta es la forma Ideal de hacer, haciendo uso de los operadores
reactivos de RxJs.*/
      this.patientService
      .save(patient)
      .pipe(switchMap(() => {
        console.log('linea 116 :: nombre de paciente: %s', patient.firstName);
        return this.patientService.findAll();
      }))
      .subscribe(data => {
        this.patientService.setPatientChange(data);
      });
    }

    /*6.3.5 Uso de subjects :: Despues de editar o insertar, desaparece la seccion html del componente patient-edit y se regresa
    a la seccion superior html del componente html. A esta instrucccion se le llama navegacion programatica. */
    this.router.navigate(['/pages/patient']);

    /*
    //6.3.4 Uso de subjects :: Un ejemplo con multiples pipes.
    if (this.isEdit)
    {
    //No ideal
      this.patientService.update(this.id, patient).subscribe(() => {
        this.patientService.findAll().subscribe(data => {
          this.patientService.findAll().subscribe(data => {
            this.patientService.setPatientChange(data);
          })
        })
      });
    }
    else //Guardar, insertar
    {
    //Ideal
      this.patientService
      .save(patient)
      .pipe(switchMap(() => this.patientService.findAll()))
      .pipe(switchMap(() => this.patientService.findAll()))
      .subscribe(data => {
        this.patientService.setPatientChange(data);
      });
    }
    */
  }
}
