import { Component, OnInit } from '@angular/core';
import { Constants } from '../config/constants'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title:string = Constants.title;

  constructor() { }

  ngOnInit(): void {
  }

}
