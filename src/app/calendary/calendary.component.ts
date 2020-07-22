import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css']
})
export class CalendaryComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
