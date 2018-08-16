import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormBuilder, Validators } from '@angular/forms'

import { Employee } from './employee.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  employees: Employee[] = []
  empForm = this.fb.group({
    empId: ['', [ Validators.required ]],
    empName: ['', [ Validators.required ]],
    empSalary: ['', [ Validators.required ]],
    empCity: ['', [ Validators.required ]],
    empState: ['', [ Validators.required ]]
  })
  emp:Employee
  query:string = ''
  isUpdating = false

  constructor(private service: AppService, private fb: FormBuilder){}

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.service.getEmployees().subscribe((emps: Employee[]) => {
      this.employees = emps
    })
  }

  addUpdateEmployee() {
    this.emp = {
      empId: this.empForm.value.empId,
      empName: this.empForm.value.empName,
      empSalary: this.empForm.value.empSalary,
      empAddress: {
        city: this.empForm.value.empCity,
        state: this.empForm.value.empState
      }
    }
    if(this.isUpdating) {
      this.service.updateEmployee(this.emp).subscribe((data)=>{
      console.log('Put')
      this.getEmployees()
      this.reset()
    })
    }
    else {
    this.service.addEmployee(this.emp).subscribe((data)=>{
      this.getEmployees()
      this.reset()
    })
  }
  }

  findByStates() {
    this.service.findByStates(this.query).subscribe((emps: Employee[])=>{
      this.employees = emps
    })
  }

  reset() {
    console.log("reset")
    this.empForm.reset()
    this.isUpdating = false
  }

  update(emp:Employee) {
    this.isUpdating = true
    console.log(emp)
    console.log(this.isUpdating)
    this.empForm.controls.empId.setValue(emp.empId)
    this.empForm.controls.empName.setValue(emp.empName)
    this.empForm.controls.empSalary.setValue(emp.empSalary)
    this.empForm.controls.empCity.setValue(emp.empAddress.city)
    this.empForm.controls.empState.setValue(emp.empAddress.state)
  }

  updateEmployee() {

  }


  submitForm() {
    this.addUpdateEmployee()
  }
}
