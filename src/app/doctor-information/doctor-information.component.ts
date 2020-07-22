import { Component, OnInit } from '@angular/core';
import { Doctor } from '../model/doctor.model';
import { RequestService } from '../../services/request.service';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-doctor-information',
  templateUrl: './doctor-information.component.html',
  styleUrls: ['./doctor-information.component.css']
})
export class DoctorInformationComponent implements OnInit {

  doctor: Doctor;

  constructor(private service: RequestService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.service.getRequest('doctor/find_by_username/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.doctor = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
