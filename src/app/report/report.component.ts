import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  info: any = [ {category: 'A', definition: 'Good nutrition status'},
   {category: 'B', definition: 'Moderate malnutrition'},
   {category: 'C', definition: 'Severe malnutrition'}];
  imc: any = [ {category: '< 16', definition: 'Severe Malnutrition'},
   {category: '16-16.9', definition: 'Moderate malnutrition'},
   {category: '17-18.4', definition: 'Svere malnutrition'},
   {category: '18.5-24.9', definition: 'Normal'},
   {category: '25-29.9', definition: 'Overweight'},
   {category: '30-34.9', definition: 'Obese TypeI'},
   {category: '35-39.9', definition: 'Obese TypeII'},
   {category: '>40', definition: 'Obese TypeIII'}];

  ecog: any = [ {category: '0', definition: 'Fully active, without restriction'},
   {category: '1', definition: 'Restricted in physically strenous activity but able to carry out work.'},
   {category: '2', definition: 'Ambulatory and capable of all selfcare but unable to carry out any work activities'},
   {category: '3', definition: 'Limited self-care, confined to bed 50%.'},
   {category: '4', definition: 'Completely disabled. Cannot carry on any self-care'},
   {category: '5', definition: 'Dead'}];
   displayedColumns = ['category', 'description'];
   source: any = [ {title: 'CATEGORY',  info: this.info },
   {title: 'IMC',  info: this.imc },
   {title: 'ECOG',  info: this.ecog }];
  
  constructor() { }

  ngOnInit(): void {
  }

}
