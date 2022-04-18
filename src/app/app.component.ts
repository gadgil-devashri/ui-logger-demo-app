import { Component, OnInit } from '@angular/core';
import LoggerWrapper from '../app/npm-logger-package';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // Initializing the ui logger framework
    LoggerWrapper.init({
      appId: 'ui-logger-demo',
      currentSession: 'test',
      advnaced: false,
      eventType: 'FUN_DRINKS',
      eventSubType: 'APP_INIT'
    })
    // Info level logger 
    LoggerWrapper.info({
      level: 'info',
      appId: 'ui-logger-demo',
      eventType: 'FUN_DRINKS',
      eventSubType: 'APP_INIT',
      eventSource: {
        component: 'app.component',
        subComponent: 'app.component.ts',
        stepName: "Angular app initialized",
        businessCapability: "app load",
        businessFunctionality: "app load init"
      },
      eventAttributes: {
        // Add custom attributes events
       url: 'http://localhost:4200/'
      }
    })
  }
  title = 'ui-logger-demo';
}
