import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 


@Injectable({
  providedIn: 'root'
})

export class RequestToSmartReportingBatchService {

  url: string = "http://localhost:3000";
  contenu: any;
  apiResponseOK: any;
  apiResponseError: any;
  apiResonseIsCompleted: boolean = false;

  constructor(private _http: HttpClient) { }


  maRequeteTestGet(){
    return this._http.get('https://jsonplaceholder.typicode.com/todos/1');
   }

   login(formData){
    return this._http.post(this.url+"/auth/login/", formData)    
   }

   register(formData){
    return this._http.post(this.url+"/auth/register/", formData)    
   }

   checkLogNotification(){
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };

    return this._http.get(this.url+"/batch/checklognotification", httpOptions);    
   }

   getBatches(){
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };

    return this._http.get(this.url+"/batch/mainstartforautomation", httpOptions);    
   }

   linkMediaToMembers(){
    let headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
    const httpOptions = { headers: headers_object };

    return this._http.get(this.url+"/batch/linkmediaandmember", httpOptions);    
   }

   
}
