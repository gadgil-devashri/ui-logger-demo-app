import { Component, OnInit, Inject } from '@angular/core';
import { DRINKS } from '../drink-data/mock-drinks';
import { Drink } from '../drink-data/drink'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import LoggerWrapper from '../npm-logger-package';


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
    this.displayData = [];
    this.category = 'Non Alcoholic'
  }

  ngOnInit(): void {
    if(this.displayData.length > 0) {
       // Info level logger 
       LoggerWrapper.info({
        level: 'info',
        appId: 'ui-logger-demo',
        eventType: 'FUN_DRINKS',
        eventSubType: 'SHOWCASE_DATA',
        eventSource: {
          component: 'showcase-data.component',
          subComponent: 'showcase-data.component.ts',
          stepName: "Get data successful",
          businessCapability: "showcase-data",
          businessFunctionality: "showcase-data-drinks"
        },
        eventAttributes: {
          // Add custom attributes events
          url: 'http://localhost:4200/showcase-data'
        }
      })
    }
    else{
      // error level logger 
      LoggerWrapper.error({
        level: 'error',
        appId: 'ui-logger-demo',
        eventType: 'FUN_DRINKS',
        eventSubType: 'SHOWCASE_DATA',
        eventSource: {
          component: 'showcase-data.component',
          subComponent: 'showcase-data.component.ts',
          stepName: "Get data failed",
          businessCapability: "showcase-data",
          businessFunctionality: "showcase-data-drinks"
        },
        eventAttributes: {
          // Add custom attributes events
          url: 'http://localhost:4200/showcase-data'
        }
      })
    }
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
