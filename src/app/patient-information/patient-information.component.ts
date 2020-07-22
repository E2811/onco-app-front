import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { RequestService } from '../../services/request.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent implements OnInit {

  patient: Patient[] = [];
  displayedColumns = ['id',  'sex', 'weight', 'height', 'birthday', 'doctor'];

  constructor(private service: RequestService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.service.getRequest('patient/find_by_username/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.patient = [res];
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
