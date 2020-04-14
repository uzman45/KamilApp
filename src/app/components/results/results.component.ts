import { Component, OnInit, Input, AfterViewInit, ɵConsole } from '@angular/core';
import { Observable,pipe } from 'rxjs';
import { map } from "rxjs/operators";
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
@Input() title:string;
@Input() data:any[];
 

  constructor() { 
    
  }
  

  ngOnInit(): void {
   

    
  }

}
