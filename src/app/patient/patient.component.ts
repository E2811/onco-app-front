import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { RequestService } from '../../services/request.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { Doctor } from '../model/doctor.model';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Patient[] = [];
  allPatients: Patient[] = [];
  newPatient: Patient;
  displayedColumns = ['id', 'name', 'username', 'email', 'phone', 'sex', 'weight', 'height', 'birthday', 'doctor'];
  idDoctors: number[];
  doctors: Doctor[] = [];

  constructor(
    private service: RequestService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.getRequest('patient/findAll').subscribe(
      (res) => {
        this.patients = res;
        this.allPatients = res;
        console.log(res);
        this.getDoctors();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDoctors(){
    this.service.getRequest('doctor/findAll').subscribe(
      (res) => {
        this.doctors = res;
        this.idDoctors = this.doctors.map(doctor => doctor.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePatientComponent, {
      data: this.idDoctors,
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.newPatient = result;
        this.patients = this.patients.concat(this.newPatient);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    const value = filterValue.trim().toLowerCase();
    if (value === '') {
      this.ngOnInit();
    }
    this.patients = this.allPatients.filter((patient) => {
      if (
        patient.name.trim().toLowerCase().includes(value) ||
        patient.email.trim().toLowerCase().includes(value) ||
        patient.phone.trim().toLowerCase().includes(value) ||
        patient.username.trim().toLowerCase().includes(value) ||
        patient.id === parseInt(value)
      ) {
        return patient;
      }
    });
  }
  delete(id){
    this.service.deleteRequest('patient/' + id).subscribe(
      (data) => {
        this.patients = this.patients.filter((patient) => id !== patient.id);
        return data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
