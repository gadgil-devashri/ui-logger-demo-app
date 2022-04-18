import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  status = new FormControl('info');
  eventType:string = '';
  eventSubtype:string = '';
  statusList: string[] = ['info', 'warn', 'error', 'debug'];

  isDataReady : boolean = false; 
  logs: any;
  displayedColumns: string[] = [];
  filterObj :any = {};
  dateRange: FormGroup;
  
  

  constructor(private utility : ApiService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.dateRange = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });
   }

  ngOnInit(): void {
    // api call
    this.getLogs();
    this.displayedColumns = ['Event type','Event subType','Business capability', 'Component', 'Status', 'Timestamp'];
  }

  getLogs(options?:any){
    this.utility.get(options).subscribe(data => {
      this.logs = data;
      console.log(this.logs);
      this.isDataReady = true;
    });
  }

  onFilterLogs(){
    if(this.eventType != ''){
      this.filterObj.eventType = this.eventType
    }
    if(this.eventSubtype != ''){
      this.filterObj.eventSubtype = this.eventSubtype
    }
    if(this.status.value){
      this.filterObj.eventStatus = this.status.value
    }
    if(this.dateRange.value.start && this.dateRange.value.end){
      this.filterObj.fromDate = this.dateRange.value.start.toISOString();
      this.filterObj.toDate = this.dateRange.value.end.toISOString()
    }
    console.log(this.filterObj);
    this.isDataReady = false;
    this.logs = [];
    this.getLogs(this.filterObj);
  }

}
