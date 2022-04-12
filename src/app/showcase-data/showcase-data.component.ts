import { Component, OnInit, Inject } from '@angular/core';
import { DRINKS } from '../drink-data/mock-drinks';
import { Drink } from '../drink-data/drink'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-showcase-data',
  templateUrl: './showcase-data.component.html',
  styleUrls: ['./showcase-data.component.css']
})
export class ShowcaseDataComponent implements OnInit {
  displayData : Drink[] = [];
  category:string = ''

  constructor(public dialog: MatDialog) { 
    // assign data to be displayed
    this.displayData = DRINKS;
    this.category = 'Non Alcoholic'
  }

  ngOnInit(): void {
  }

  openDialog(chunk:Drink) {
    this.dialog.open(DialogDataExampleDialog, {
      data: chunk
    });
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Drink) {}
}
