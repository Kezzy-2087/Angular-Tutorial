import { Component, inject, OnInit, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Observable } from 'rxjs';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent  implements OnInit{
 

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName : new FormControl("", [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""), 
    leadByEmpId :new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson:new FormControl(""),
    contactPersonContactNo :new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetail: new FormControl(""),
    contactPersonEmailId: new FormControl("", [Validators.email]),
    clientId: new FormControl("")
  })


  clientSrv = inject (ClientService);
  employeeList: Employee[] = [];
  clientList: Client[]=[];

  firstName = signal("Client Project Tutorial");
  projectList = signal<ClientProject[]>([])

  
  
  ngOnInit(): void {
    const name = this.firstName();
    this.getAllClient();
    this.getAllEmployee();
  
  }

  changeFName(){
    this.firstName.set("Project List")
  }

  getAllEmployee(){
    this.clientSrv.getAllEmployee().subscribe((res:APIResponseModel)=>
    {
      this.employeeList = res.data
    })

  }

  getAllClient(){
    this.clientSrv.getAllClients().subscribe((res:APIResponseModel)=>
    {
      this.clientList = res.data
    })

  }

  onSaveProject(){
    const formValue = this.projectForm.value
    debugger;
    this.clientSrv.addClientProjectUpdate(formValue).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert("Project Created Successfylly!")
        
      } else {
        alert(res.message)
      }
    })
  }
  


}

