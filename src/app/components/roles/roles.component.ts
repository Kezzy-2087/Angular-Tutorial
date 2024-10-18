import { HttpClient } from '@angular/common/http';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})

export class RolesComponent implements OnInit {
  roleList: IRole[] = [];

  // constructor(private http: HttpClient){ old way of creating dependency injector with constructor
  // }

  http = inject(HttpClient)
  ngOnInit(): void {
    this.getAllRoles()
  }
  getAllRoles(){
    this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res:APIResponseModel)=>{
      this.roleList = res.data;

    })
  }












  

  // projectName: string = "Angular Tutorial";
  // angularVersion = "Version 18";
  // verison: number = 18;
  // isActive: boolean = false;
  // currentDate: Date = new(Date);  
  // inputType: string = "button";
  // selectedState: string = " ";

  // //normal function
  // welcomeAlert(){
  //   alert("Welcome to my Angular page")

  // }

  // //function with parameter
  // showMesage(message: string){
  //   alert(message)

  // }

}
