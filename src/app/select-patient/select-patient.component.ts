import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {
  usernameAvailable: string[] = [];
  usernameSelected: FormControl = new FormControl();

  constructor(
              private dialogRef: MatDialogRef<SelectPatientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]
  ) { }

  ngOnInit(): void {
    this.usernameAvailable = Object.values(this.data);
    console.log('entra');
    console.log(this.usernameAvailable);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendSelected(){
    console.log('aqui');
    console.log(this.usernameSelected.value);
    this.dialogRef.close(this.usernameSelected.value);
  }

}
