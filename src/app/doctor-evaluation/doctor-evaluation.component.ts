import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../model/filter.model';
import { PatientListComponent } from '../patient-list/patient-list.component';

@Component({
  selector: 'app-doctor-evaluation',
  templateUrl: './doctor-evaluation.component.html',
  styleUrls: ['./doctor-evaluation.component.css']
})
export class DoctorEvaluationComponent implements OnInit {
  doctorEvaluationForm: FormGroup;
  metabolic: Filter[] = [
    {value: 'NONE', viewValue: 'None'},
    {value: 'MINOR', viewValue: 'Minor'},
    {value: 'MODERATE', viewValue: 'Moderate'},
    {value: 'HIGH', viewValue: 'High'}
  ];
  category: Filter[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'B', viewValue: 'B'},
    {value: 'C', viewValue: 'C'},
  ];

  constructor(
    private fb: FormBuilder, private service: RequestService,
    private dialogRef: MatDialogRef<PatientListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.doctorEvaluationForm = this.fb.group({
      metabolic: ['',  [Validators.required]],
      category: ['', [Validators.required]],
      evaluationId: this.data.id,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createDoctorEvaluation() {
    this.service.postRequest('evaluation/complete', this.doctorEvaluationForm.value).subscribe(res => {
      console.log(res);
      this.createResult(this.data.id)
      this.dialogRef.close(res);
     },
      err => {console.log(err); }
    );
  }

  createResult(id) {
    this.service.postRequest('result/save/' + id, null).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
     },
      err => {console.log(err); }
    );
  }

}
