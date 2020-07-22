import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { RequestService } from '../../services/request.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { DataService } from 'src/services/data.service';
import { Doctor } from '../model/doctor.model';
import {Evaluation} from '../model/evaluation.mode';
import { PatientEvaluationComponent } from '../patient-evaluation/patient-evaluation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SelectPatientComponent} from '../select-patient/select-patient.component';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  public showFindAll: boolean = true;
  public showCompleteEvaluation: boolean = false;
  public showEvaluation: boolean = false;
  patients: Patient[] = [];
  doctor: Doctor = null;
  allPatients: Patient[] = [];
  usernameAvailable: string[] = [];
  newPatient: Patient;
  displayedColumns = ['id', 'name', 'username', 'email', 'phone', 'sex', 'weight', 'height', 'birthday'];
  evaluationsCompleted: Evaluation[] = [];

  constructor(private service: RequestService,
              private dialog: MatDialog,
              private dataService: DataService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.getRequest('doctor/find_by_username/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.doctor = res;
        this.findPatients(this.doctor);
      },
      (err) => {
        console.log(err);
      }
    ); 
  }
  findPatients(doctor){
    this.showFindAll = true;
    this.service.getRequest('patient/find_by_doctor/' + doctor.id).subscribe(
      (res) => {
        this.patients = res;
        this.allPatients = res;
        this.patients.forEach(patient => this.usernameAvailable.push(patient.username));
        console.log(this.usernameAvailable);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePatientComponent, {
      data: { },
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

  findCompleteEvaluations(usernameSelected: string[]){
    console.log(usernameSelected);
    this.showCompleteEvaluation = true;
    usernameSelected.forEach(element => {
      this.service.getRequest('evaluation/find_by_patient/completed/' + element).subscribe(
        (res) => {
          this.evaluationsCompleted = res;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  openDialogUsername(): void {
    const dialogRef = this.dialog.open(SelectPatientComponent, {
      data: { username: this.usernameAvailable },
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.findCompleteEvaluations(result);
      }
    });
  }

}
