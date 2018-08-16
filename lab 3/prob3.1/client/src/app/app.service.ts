import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Employee } from './employee.interface'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }
  
  getEmployees() {
    return this.http.get<Employee[]>(this.url)
  }

  findByStates(state:string) {
    console.log("Hello")
    return this.http.get(this.url,{params: {
      state: state
    }} )
  }

  addEmployee(emp: Employee) {
    return this.http.post(this.url,emp)
  }

  updateEmployee(emp: Employee) {
    return this.http.put(this.url, emp)
  }
}
