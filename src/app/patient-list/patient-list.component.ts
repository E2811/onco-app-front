import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { RequestService } from '../../services/request.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { DataService } from 'src/services/data.service';
import { Doctor } from '../model/doctor.model';
import {Evaluation} from '../model/evaluation.mode';
import {PatientEvaluation} from '../model/patient-evaluation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DoctorEvaluationComponent} from '../doctor-evaluation/doctor-evaluation.component';
import {SelectPatientComponent} from '../select-patient/select-patient.component';
import { Result } from '../model/result.model';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public showFindAll: boolean = true;
  public showCompleteEvaluation: boolean = false;
  public showEvaluation: boolean = false;
  patients: Patient[] = [];
  doctor: Doctor = null;
  allPatients: Patient[] = [];
  usernameAvailable: string[] = [];
  newPatient: Patient;
  displayedColumns = ['id', 'name', 'username', 'email', 'phone', 'sex', 'weight', 'height', 'birthday'];
  displayedColumnsComp = ['id', 'intake', 'symptoms', 'weight', 'ecog', 'metabolic', 'category', 'review', 'patient'];
  displayedColumnsResult = ['imc', 'bodySurface', 'weightLoss', 'caloriesNeeded'];
  displayedColumnsEval = ['id', 'intake', 'symptoms', 'weight', 'ecog', 'review', 'patient'];
  evaluationsCompleted: Evaluation[] = [];
  evaluations: PatientEvaluation[] = [];
  message: string = 'Evaluation Completed';
  result: Result[] = [];
  constructor(private service: RequestService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
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
    this.showCompleteEvaluation = true;
    this.showEvaluation = false;
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

  findEvaluations(usernameSelected: string[]){
    this.showEvaluation = true;
    this.showCompleteEvaluation = false;
    console.log(usernameSelected);
    usernameSelected.forEach(element => {
      this.service.getRequest('evaluation/find_by_patient/' + element).subscribe(
        (res) => {
          this.evaluations = res;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  openDialogUsername(option): void {
    const dialogRef = this.dialog.open(SelectPatientComponent, {
      data: this.usernameAvailable ,
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && option === 1) {
        this.findCompleteEvaluations(result);
      } else if (result && option === 2){
        this.findEvaluations(result);
      }
    });
  }
  evaluate(id): void {
    const dialogRef = this.dialog.open(DoctorEvaluationComponent, {
      data: { id},
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.openSnackBar();
        this.evaluations = this.evaluations.filter((evaluations) => id !== evaluations.id);
      }
    });
  }

  openSnackBar() {
    this.snackBar.open(this.message, 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['first-class'],
    });
  }

  showResult(id){
    this.service.getRequest('result/find_by_evaluation/' + id).subscribe(
      (res) => {
        this.result = [res];
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openDialogAppointment(){
    
  }
}
