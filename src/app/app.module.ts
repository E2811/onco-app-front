import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PatientComponent } from './patient/patient.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorEvaluationComponent } from './doctor-evaluation/doctor-evaluation.component';
import { PatientEvaluationComponent } from './patient-evaluation/patient-evaluation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarPatientComponent } from './sidebar-patient/sidebar-patient.component';
import { SidebarDoctorComponent } from './sidebar-doctor/sidebar-doctor.component';
import { PatientInformationComponent } from './patient-information/patient-information.component';
import {MatCardModule} from '@angular/material/card';
import { EvaluationComponent } from './evaluation/evaluation.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CalendaryComponent } from './calendary/calendary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorInformationComponent } from './doctor-information/doctor-information.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectPatientComponent } from './select-patient/select-patient.component'; 
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    PatientComponent,
    CreatePatientComponent,
    CreateDoctorComponent,
    DoctorComponent,
    DoctorEvaluationComponent,
    PatientEvaluationComponent,
    DashboardComponent,
    SidebarPatientComponent,
    SidebarDoctorComponent,
    PatientInformationComponent,
    EvaluationComponent,
    CalendaryComponent,
    DoctorInformationComponent,
    PatientListComponent,
    SelectPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    NgbModule,
    MatCheckboxModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    AuthGuard,
    MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
