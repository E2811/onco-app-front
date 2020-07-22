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
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluationsCompleted: Evaluation[] = [];
  evaluations: Evaluation[] = [];
  allEvaluations: Evaluation[] = [];
  displayedColumns = ['id', 'intake', 'symptoms', 'weight', 'ecog', 'metabolic', 'category', 'review'];
  displayedColumnsResult = ['imc', 'bodySurface', 'weightLoss', 'caloriesNeeded'];
  panelOpenState = false;
  result: Result[] = [];
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
  }

  openDialog(idPatient): void {
    const dialogRef = this.dialog.open(PatientEvaluationComponent, {
      data: {id: idPatient},
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

}
