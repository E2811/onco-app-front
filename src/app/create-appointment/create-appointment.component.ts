import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Filter } from '../model/filter.model';


@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  type: Filter[] = [
    {value: 'CHEMOTHERAPY', viewValue: 'Chemotherapy'},
    {value: 'RADIOTHERAPHY', viewValue: 'Radiotherahy'},
    {value: 'INMUNOTHERAPY', viewValue: 'Inmunotherapy'},
    {value: 'HORMONAL', viewValue: 'Hormonal'},
    {value: 'SURGERY', viewValue: 'Surgery'}
  ];
  minDate: Date;

  constructor(private fb: FormBuilder, private service: RequestService,
              private dialogRef: MatDialogRef<CreateAppointmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number[]) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.appointmentForm = this.fb.group({
      type: ['', Validators.required],
      revisionDate: ['', Validators.required],
      patient: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createAppointment() {
    this.service.postRequest('treatment/save', this.appointmentForm.value).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
     },
      err => {console.log(err); }
    );
  }
  get revisionDate() {
    return this.appointmentForm.get('revisionDate');
  }
  
}
