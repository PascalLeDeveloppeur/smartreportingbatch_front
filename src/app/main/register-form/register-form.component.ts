import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestToSmartReportingBatchService } from '../../service/RequestToSmartReportingBatch.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  displayFormValue: boolean = false;
  requestToSmartReportingBatch: any;

  constructor(private formBuilder: FormBuilder, private _requestToSmartReportingBatch: RequestToSmartReportingBatchService) { }

  ngOnInit() {
    // Modèle du formulaire
    this.registerForm = this.formBuilder.group({  // Crée une instance de FormGroup
      adminpseudo: [],                   // Crée une instance de FormControl
      adminpassword: [],                   // Crée une instance de FormControl
      verifpassword: [],                   // Crée une instance de FormControl
    });

    // service de connexion à smartReportingBatch
    this.requestToSmartReportingBatch = this._requestToSmartReportingBatch;
  }

  // lance la requête pour authentification
  register() {    
    if(this.registerForm.value.adminpseudo && this.registerForm.value.adminpassword && this.registerForm.value.verifpassword === this.registerForm.value.adminpassword && this.registerForm.value.adminpassword != this.registerForm.value.adminpseudo){

      this.requestToSmartReportingBatch.register(this.registerForm.value).subscribe(
        res => { // Si la requête aboutit correctement
          console.log('HTTP response', res);
          this.requestToSmartReportingBatch.apiResponseOK = res;
          this.requestToSmartReportingBatch.apiResponseError = "";
          alert("Administrateur a bien été enregistré");
        },
  
        err => { // S'il y a une erreur
          console.log('HTTP Error', err);
          this.requestToSmartReportingBatch.apiResponseError = err;
          this.requestToSmartReportingBatch.apiResponseOK = "";
        },
  
        () => { // Quoiqu'il arrive
          console.log('HTTP request completed.');
          this.requestToSmartReportingBatch.apiResonseIsCompleted = true;
        }  
      );
    }
  }
}