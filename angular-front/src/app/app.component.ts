import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const url = "http://localhost:3000/"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angular-front';
  jobPostings: Array<any>;
  searchTerm:String;
  constructor(private http:HttpClient){
    this.jobPostings = this.jobPostings
    this.searchTerm = this.searchTerm
  }
ngOnInit(){
  this.getJobs()
}
  getJobs():any {
    //http://localhost:3000/search
     this.http.get<any>(url+"search").subscribe(jobs =>{
      console.log(jobs,'jobs');
      
      this.jobPostings = jobs
    })
  }
  editJobs(id,input):any{
    this.http.patch<any>(url+id, {
      title: input
    }).subscribe(res=>{
      console.log('updated',res);
      
    })
  }
  deleteJobs(id):any{
    if(confirm("Are you sure to delete?")) {
      this.http.delete<any>(url+id).subscribe(res =>{
        console.log('deleted',res);
        this.getJobs()
        alert("Deleted!")
      })
    }

  }
  search(div){
    div.display="none"
  }
}

