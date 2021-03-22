import { Component, OnInit } from '@angular/core';
import { Cost } from '../model/cost.model';
import {Location } from '../model/location.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { CommonService } from '../services/common.service';



@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})

export class OperatorComponent implements OnInit {


  cityList:any[]=[];
  location:any[]=[];
  myform:FormGroup;
  pagesubmit:boolean=false;

  
  constructor(private obj:HttpClient,private frmobj:FormBuilder,private commonService:CommonService) { }

 // @Input() id: number;

  ngOnInit(): void {
    
    
    this.cityList = this.commonService.cities;
    this.location = this.commonService.locations;
    this.allTableData();

    this.myform = this.frmobj.group({
      name:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      mobile:["",[Validators.required,Validators.maxLength(10)]]
    });
  }
  keyword:string;
  p:number=1;

  getTableItem:any[]=[];
  
  name:string;
  email:string;
  mobile:string;
  city:string;
  loc:string;
  msg:string;
  serverData;

  save()
  {
    this.pagesubmit=true;
    if(this.myform.invalid)
    {
      return;
    }
    else{

      var url="http://localhost:3000/city";
      var input={
        "name":this.name,
        "email":this.email,
        "mobile":this.mobile,
        "city":this.city,
        "loc":this.loc
                };
      this.obj.post(url, input).subscribe(response=>{
        this.serverData = response as string[];
        this.msg = "Item Added Successfully !";
        this.name=""; this.email=""; this.mobile=""; this.city=""; this.loc="";
      });
    }
    
 }
  
 private allTableData()
  {
    this.obj.get("http://localhost:3000/city").subscribe(response=>{this.getTableItem=response as string[]});
  }

 
deleteTableData(data) {
    this.getTableItem.splice(data-1,1)
    this.commonService.deleteTableData(data).subscribe((gatTableItem)=>{console.log
    ("getTableData",this.getTableItem)
    })
   
   alert("Item Deleted Successfully !"); 
  }


}

