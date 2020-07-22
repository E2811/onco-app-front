import { Component, OnInit } from '@angular/core';
import { Doctor } from '../model/doctor.model';
import { RequestService } from '../../services/request.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateDoctorComponent } from '../create-doctor/create-doctor.component';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  allDoctors: Doctor[] = [];
  newDoctor: Doctor;
  displayedColumns = ['id', 'name', 'username', 'email', 'specialty'];

  constructor(
    private service: RequestService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.getRequest('doctor/findAll').subscribe(
      (res) => {
        this.doctors = res;
        this.allDoctors = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDoctorComponent, {
      data: { },
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.newDoctor = result;
        this.doctors = this.doctors.concat(this.newDoctor);
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
    this.doctors = this.allDoctors.filter((doctor) => {
      if (
        doctor.name.trim().toLowerCase().includes(value) ||
        doctor.email.trim().toLowerCase().includes(value) ||
        doctor.username.trim().toLowerCase().includes(value) ||
        doctor.id === parseInt(value)
      ) {
        return doctor;
      }
    });
  }

}
