import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
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

  ngOnInit(): void {}

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
