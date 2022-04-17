import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import LoggerWrapper from '../npm-logger-package';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  userAuthForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const loginAttemptTime = this.datePipe.transform(Date.now(), 'M/d/yy, h:mm a');
    console.log('User authentication attempt at : ', loginAttemptTime);
    // userAuthForm data here
    if (this.userAuthForm.value.username == 'admin' && this.userAuthForm.value.password == 'admin') {
      console.info('User authentication successful');
      this.router.navigate(['/showcase-data']);
      // Info level logger 
      LoggerWrapper.info({
        level: 'info',
        appId: 'ui-logger-demo',
        eventType: 'FUN_DRINKS',
        eventSubType: 'LIST_OF_DRINKS',
        eventSource: {
          component: 'user-auth.component',
          subComponent: 'user-auth',
          stepName: "user logged in successfully",
          businessCapability: "login",
          businessFunctionality: "auth-login"
        },
        eventAttributes: {
          // Add custom attributes events
          url: 'http://localhost:4200/login',
          loginAttemptTime: loginAttemptTime
        }
      })
    }
    else {
      console.error('User authentication failed');
      // error level logger 
      LoggerWrapper.error({
        level: 'error',
        appId: 'ui-logger-demo',
        eventType: 'FUN_DRINKS',
        eventSubType: 'LIST_OF_DRINKS',
        eventSource: {
          component: 'user-auth.component',
          subComponent: 'user-auth',
          stepName: "User authentication failed",
          businessCapability: "login",
          businessFunctionality: "auth-login"
        },
        eventAttributes: {
          // Add custom attributes events
          url: 'http://localhost:4200/login',
          loginAttemptTime: loginAttemptTime
        }
      })
    }
    this.userAuthForm.reset();
  }

}
