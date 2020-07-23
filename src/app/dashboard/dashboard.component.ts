import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  datax: string[] = [];
  datay: number[] = [];
  datax1: string[] = [];
  datay1: number[] = [];
  datax2: string[] = [];
  datay2: number[] = [];
  filterList = [];
  filterList2 = [];
  filterList3 = [];
  initOpts: any = {
    renderer: 'svg',
    width: 400,
    height: 400,
  };
  options: any;
  options2: any;
  options3: any;
  filterDisplayedColumns: string[] = ['Filter', 'Quantity'];
  constructor(
    public service: RequestService
  ) { }

  ngOnInit(): void {
    this.getDataActivity();
    this.getDataSymptoms();
    this.getDataCategoty();
  }

  getDataActivity(){
    this.service
      .getRequest('doctor/statistics/activity'  )
      .subscribe(
        (res) => {
          this.filterList = Object.entries(res);
          this.filterList.forEach((element) => {
            this.datax.push(element[0]);
            this.datay.push(element[1]);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    this.options = {
      color: ['#ea7e63'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.datax,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: this.datay,
        },
      ],
    };
  }
  getDataSymptoms(){
    this.service
      .getRequest('doctor/statistics/symptoms'  )
      .subscribe(
        (res) => {
          this.filterList2 = Object.entries(res);
          this.filterList2.forEach((element) => {
            this.datax1.push(element[0]);
            this.datay1.push(element[1]);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    this.options2 = {
      color: ['#ffb85c'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.datax1,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: this.datay1,
        },
      ],
    };
  }
  getDataCategoty(){
    this.service
      .getRequest('doctor/statistics/category'  )
      .subscribe(
        (res) => {
          this.filterList3 = Object.entries(res);
          this.filterList3.forEach((element) => {
            this.datax2.push(element[0]);
            this.datay2.push(element[1]);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    this.options3 = {
      color: ['#00c9a3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.datax2,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: this.datay2,
        },
      ],
    };
  }
}
