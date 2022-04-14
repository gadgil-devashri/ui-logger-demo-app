import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  isDataReady : boolean = false; 
  logs: any;
  displayedColumns: string[] = [];
  

  constructor(private utility : ApiService) { }

  ngOnInit(): void {
    // api call
    this.getLogs();
    this.displayedColumns = ['Application', 'Component', 'Status','Description', 'Timestamp'];
  }

  getLogs(){
    this.utility.get().subscribe(data => {
      this.logs = data;
      console.log(this.logs);
      this.isDataReady = true;
    });
  }

}
