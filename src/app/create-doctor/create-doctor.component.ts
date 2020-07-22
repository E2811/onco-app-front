import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../model/filter.model';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {

  doctorForm: FormGroup;
  specialty: Filter[] = [
    {value: 'HAEMATOLOGIST', viewValue: 'Hematologist'},
    {value: 'GYNECOLOGY', viewValue: 'Ginecology'},
    {value: 'PEDIATRICIAN', viewValue: 'Pediatrician'},
    {value: 'ORTHOPEDIST', viewValue: 'Orthopedist'}
  ];

  constructor(private fb: FormBuilder, private service: RequestService,
              private dialogRef: MatDialogRef<CreateDoctorComponent>) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      specialty: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createDoctor() {
    this.service.postRequest('doctor/save', this.doctorForm.value).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
     },
      err => {console.log(err); }
    );
  }
  get name() {
    return this.doctorForm.get('name');
  }
  get username() {
    return this.doctorForm.get('username');
  }

  get email() {
    return this.doctorForm.get('email');
  }

  get password() {
    return this.doctorForm.get('password');
  }

}
