import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../model/filter.model';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patientForm: FormGroup;
  sex: Filter[] = [
    {value: 'F', viewValue: 'Female'},
    {value: 'M', viewValue: 'Male'}
  ];

  constructor(private fb: FormBuilder, private service: RequestService,
              private dialogRef: MatDialogRef<CreatePatientComponent>) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      sex: [''],
      birthday: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      weight: ['', [Validators.required, Validators.min(0), Validators.pattern(/[0-9]/)]],
      height: ['', [Validators.required, Validators.min(0), Validators.pattern(/[0-9]/)]],
      doctor: ['', [Validators.required, Validators.min(0), Validators.pattern(/[0-9]/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPatient() {
    this.service.postRequest('patient/save', this.patientForm.value).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
     },
      err => {console.log(err); }
    );
  }
  get name() {
    return this.patientForm.get('name');
  }
  get username() {
    return this.patientForm.get('username');
  }

  get email() {
    return this.patientForm.get('email');
  }
  get phone() {
    return this.patientForm.get('phone');
  }
  get weight() {
    return this.patientForm.get('weight');
  }
  get height() {
    return this.patientForm.get('height');
  }
  get doctor() {
    return this.patientForm.get('doctor');
  }
  get birthday() {
    return this.patientForm.get('birthday');
  }
  get password() {
    return this.patientForm.get('password');
  }

}
