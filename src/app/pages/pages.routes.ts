import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { MedicComponent } from './medic/medic.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';

export const pagesRoutes: Routes = [
    {
        path: 'patient', component: PatientComponent
        , children: 
        [
/*3.4 Listando en Angular Material table :: El orden de incrustracion seria el siguiente: index.html se muestra, dentro de este 
está incrustrado la pagina html del componente app, dentro de este podria estar o bien la pagina html del componente login, o bien
del componente medic o bien del componente patient, y dentro del patient por ejm podria estar incrustrada como podria no estarlo 
la pagina html del componente patient-edit.*/

            {path: 'new', component: PatientEditComponent},
/*4.5 Trabajando con Formularios en Angular ::En este caso, :id es la parte variable, dinamica de la url.*/
            {path: 'edit/:id', component: PatientEditComponent}
            
        ]
    },
    {
        path: 'medic', component: MedicComponent
    }
];