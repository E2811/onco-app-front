import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../model/filter.model';
import { EvaluationComponent } from '../evaluation/evaluation.component';

@Component({
  selector: 'app-patient-evaluation',
  templateUrl: './patient-evaluation.component.html',
  styleUrls: ['./patient-evaluation.component.css']
})
export class PatientEvaluationComponent implements OnInit {

  pEvaluationForm: FormGroup;
  intake: Filter[] = [
    {value: 'STABLE', viewValue: 'Stable'},
    {value: 'LESSER', viewValue: 'Lesser'},
    {value: 'INCREASED', viewValue: 'Increased'},
    {value: 'LIQUIDS', viewValue: 'Liquids'},
    {value: 'SUPPLEMENTS', viewValue: 'Suplements'},
    {value: 'SCANTY', viewValue: 'Scanty'}
  ];
  ecog: Filter[] = [
    {value: 'FULLY_ACTIVE', viewValue: 'Fully active'},
    {value: 'RESTRICTED', viewValue: 'Restricted'},
    {value: 'AMBULATORY', viewValue: 'Ambulatory'},
    {value: 'LIMITED_SELFCARE', viewValue: 'Limited selfcare'},
    {value: 'DISABLED', viewValue: 'Disabled'}
  ];
  symptoms: Filter[] = [
    {value: 'STABLE', viewValue: 'Stable'},
    {value: 'LACK_APPETITE', viewValue: 'Lack appetite'},
    {value: 'NAUSEA', viewValue: 'Nausea'},
    {value: 'VOMIT', viewValue: 'Vomit'},
    {value: 'DRYNESS', viewValue: 'Dryness'},
    {value: 'DIARRHOEA', viewValue: 'Diarrhoea'},
    {value: 'MOUTH_SORES', viewValue: 'Mouth_sores'},
    {value: 'CONSTIPATION', viewValue: 'CONSTIPATION'}
  ];

  constructor(private fb: FormBuilder, private service: RequestService,
              private dialogRef: MatDialogRef<EvaluationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.id);
    this.pEvaluationForm = this.fb.group({
      intake: [''],
      symptoms: [''],
      ecog: [''],
      weight: ['', [Validators.required, Validators.min(0), Validators.pattern(/[0-9]/)]],
      patient: this.data.id,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPEvaluation() {
    this.service.postRequest('evaluation/save', this.pEvaluationForm.value).subscribe(res => {
      console.log(res);
      this.dialogRef.close(res);
     },
      err => {console.log(err); }
    );
  }

  get weight() {
    return this.pEvaluationForm.get('weight');
  }


}
