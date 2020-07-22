import { Component } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DataService } from '../services/data.service';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onco-app-front';
  loggedIn: boolean = false;
  role: string;
  username: string;

  constructor(
    private service: RequestService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.isLogged.subscribe(
      (isLogged) => (this.loggedIn = isLogged)
    );
    this.dataService.role.subscribe(
      (role) => (this.role = role)
    );
  }
}
