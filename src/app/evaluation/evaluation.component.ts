import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {Evaluation} from '../model/evaluation.mode';
import {Result} from '../model/result.model';
import { DataService } from 'src/services/data.service';
import { PatientEvaluationComponent } from '../patient-evaluation/patient-evaluation.component';
import { Patient } from '../model/patient.model';
import { PatientEvaluation } from '../model/patient-evaluation.model';
import { ReportComponent } from '../report/report.component';
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluationsCompleted: Evaluation[] = [];
  evaluations: PatientEvaluation[] = [];
  allEvaluations: Evaluation[] = [];
  displayedColumns = ['id', 'intake', 'symptoms', 'weight', 'ecog', 'metabolic', 'category', 'review'];
  displayedColumnsIncomplete = ['id', 'intake', 'symptoms', 'weight', 'ecog', 'review'];
  displayedColumnsResult = ['imc', 'bodySurface', 'weightLoss', 'caloriesNeeded'];
  panelOpenState = false;
  result: Result[] = [];
  patient: Patient;
  constructor(
        private service: RequestService,
        private dataService: DataService,
        private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.getRequest('evaluation/find_by_patient/completed/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.evaluationsCompleted = res;
        this.allEvaluations = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.showEvaluationIncomlete();
    this.service.getRequest('patient/find_by_username/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.patient = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showEvaluationIncomlete(){
    this.service.getRequest('evaluation/find_by_patient/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.evaluations = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PatientEvaluationComponent, {
      data: {id: this.patient.id},
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.evaluations = this.evaluations.concat(result);
      }
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

  openDialogInfo(): void {
    const dialogRef = this.dialog.open(ReportComponent, {
      data: {},
      height: '800px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe();
  }

}
