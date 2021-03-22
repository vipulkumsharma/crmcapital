import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private obj:HttpClient) { }

  ngOnInit(): void {
    this.allTableData();
    
  }

  getTableItem:any[]=[];
  keyword:string;
  p:number=1;

  
  allTableData()
  {
    this.obj.get("http://localhost:3000/table-data").subscribe(response=>{this.getTableItem=response as string[]});
  }
}
