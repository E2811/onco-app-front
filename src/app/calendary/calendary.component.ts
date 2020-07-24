import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import {Treatment} from '../model/treatment.model';
import { Patient } from '../model/patient.model';
import { RequestService } from '../../services/request.service';
import { DataService } from 'src/services/data.service';
import {Appointment} from '../model/appointment.model';
import { PatientEvaluation } from '../model/patient-evaluation.model';
import { Doctor } from '../model/doctor.model';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.scss']
})

export class CalendaryComponent implements OnInit {
  events: Appointment[] = [];
  calendarVisible = true;
  treatments: Treatment[] = [];
  evaluations: PatientEvaluation[] = [];
  patient: Patient;
  colorEvent = '#00c9a3';
  colorTreatment = '#cfbcf2';
  colorNew = '#ffb85c';
  patients: Patient[];
  patientId: number[] = [];
  idAvailables: number[] = [];
  newAppointment: Appointment;
  treatment: Treatment;
  doctor: Doctor;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    selectable: true,
    events: this.events,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    if (title.toLowerCase() === 'treatment' && this.dataService.getRoleValue() === 'ROLE_DOCTOR'){
      const dialogRef = this.dialog.open(CreateAppointmentComponent, {
        data: this.patientId,
        height: '400px',
        width: '400px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.treatment = result;
          calendarApi.addEvent({
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
            backgroundColor: this.colorNew
          });
          this.events = this.events.concat({ title: this.treatment.type + 'patient ' + this.treatment.patient ,
             date: selectInfo.startStr, backgroundColor: this.colorEvent});
          }
      });
    } else {
      calendarApi.unselect();
      if (title) {
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          backgroundColor: this.colorNew
        });
        this.events = this.events.concat({ title, date: selectInfo.startStr, backgroundColor: this.colorEvent});
        }
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
    this.events = this.events.filter(event => clickInfo.event.title !== event.title);
  }


  constructor(private service: RequestService,
              private dataService: DataService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.dataService.getRoleValue() === 'ROLE_PATIENT'){
      this.findPatient();
    }else if (this.dataService.getRoleValue() === 'ROLE_DOCTOR'){
      this.findDoctor();
    }
  }

  findPatient(){
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
  findDoctor(){
    this.service.getRequest('doctor/find_by_username/' + this.dataService.getUsernameValue()).subscribe(
      (res) => {
        this.doctor = res;
        this.findPatientsByDoctor();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findPatientsByDoctor(){
      this.service.getRequest('patient/find_by_doctor/' + this.doctor.id).subscribe(
        (res) => {
          this.patients = res;
          this.patients.forEach(patient => this.patientId.push(patient.id));
          console.log(this.patientId);
          this.findAppointmentsDoctor();
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
          this.events.push({title: element.type + ' ' + element.id , date: element.revisionDate, backgroundColor: this.colorTreatment});
        });
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
          this.events.push({title: 'evaluation ' + element.id, date: element.review, backgroundColor: this.colorEvent});
        });
        console.log(this.events);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findAppointmentsDoctor(){
    this.patientId.forEach(id => {
      this.service.getRequest('treatment/find_by_patient/' + id).subscribe(
        (res) => {
          this.treatments = res;
          this.treatments.forEach((element) => {
            this.events.push({title: element.type + ' (patient ' + id + ')',
            date: element.revisionDate, backgroundColor: this.colorTreatment});
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
