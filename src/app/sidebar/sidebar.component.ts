import { Component, OnInit } from '@angular/core';
import { ROUTES } from './side-bar-routes.config';
import { RequestService } from 'src/services/request.service';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: Array<object>;
  clickedItem: string = 'Patient';

  constructor(
    private requestService: RequestService,
    private dataService: DataService,
    private router: Router
  ) {
    this.menuItems = ROUTES;
  }

  ngOnInit(): void {
  }

  changeActive(clickedAnchor: string) {
    this.clickedItem = clickedAnchor;
  }

  logout() {
    this.requestService.logout();
    this.dataService.changeState(false);
    this.router.navigate(['/']);
  }

}
