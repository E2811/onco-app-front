import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {Treatment} from '../model/treatment.model';
import { Patient } from '../model/patient.model';
import { RequestService } from '../../services/request.service';
import { DataService } from 'src/services/data.service';
import {Appointment} from '../model/appointment.model';
import { PatientEvaluation } from '../model/patient-evaluation.model';
@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css']
})

export class CalendaryComponent implements OnInit {
  events: Appointment[] = [];
  treatments: Treatment[] = [];
  evaluations: PatientEvaluation[] = [];
  patient: Patient;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.events

  };


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }
  constructor(private service: RequestService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.service.getRequest('patient/find_by_username/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.patient = res;
        console.log(res);
        this.findAppointments();
        this.findEvaluations();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  findAppointments(){
    this.service.getRequest('treatment/find_by_patient/' + this.patient.id).subscribe(
      (res) => {
        this.treatments = res;
        this.treatments.forEach((element) => {
          this.events.push({title: element.type, date: element.revisionDate});
        });
        console.log(this.events);
        console.log(this.calendarOptions);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  findEvaluations(){
    this.service.getRequest('evaluation/find_by_patient/' + this.patient.username).subscribe(
      (res) => {
        this.evaluations = res;
        this.evaluations.forEach((element) => {
          this.events.push({title: 'evaluation ' + element.id, date: element.review});
        });
        console.log(this.events);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
