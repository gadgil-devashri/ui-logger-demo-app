import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
// import { LoggerWrapper } from '../../logger-package'
// import LoggerWrapper from '../../logger-package'

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
  constructor(private formBuilder: FormBuilder,private datePipe: DatePipe, private router:Router) { }

  ngOnInit(): void {
  // Logger init
  /* LoggerWrapper.init({
    appId: 'ui-logger-demo',
    currentSession: 'test',
    advnaced: false,
    eventType: 'FUN_DRINKS',
    eventSubType: 'LIST_OF_DRINKS'
  })
  LoggerWrapper.info({
    level: 'info',
    appId: 'ui-logger-demo',
    eventType: 'FUN_DRINKS',
    eventSubType: 'LIST_OF_DRINKS',
    eventSource: {
      component: 'user-auth.component',
      subComponent: 'user-authentication-module',
      stepName: "user trying to login",
      businessCapability: "logger",
      businessFunctionality: "log trace"
    },
    eventAttributes: {
     url: 'www.uncc.edu'
    }
  })*/
  } 

  onSubmit(): void {
    // userAuthForm data here
    if(this.userAuthForm.value.username == 'admin' && this.userAuthForm.value.password == 'admin')
    {
      console.info('User authentication successful');
      this.router.navigate(['/showcase-data']);
    }
    else{
      console.error('User authentication failed');
    }
    const loginAttemptTime = this.datePipe.transform(Date.now(),'M/d/yy, h:mm a');
    console.log('User authentication attempt at : ', loginAttemptTime);
    this.userAuthForm.reset();
  }

}
