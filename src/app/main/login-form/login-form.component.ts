// J'importe Output et EventEmitter qui servent à envoyer des données au composant parent
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// J'importe le service RequestToSmartReportingBatchService
import { RequestToSmartReportingBatchService } from '../../service/RequestToSmartReportingBatch.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  
  // Je déclare le formulaire
  loginForm: FormGroup;
  displayFormValue: boolean = false;


  requestToSmartReportingBatch: any;

  nbrOfNotifications: number; 


  // J'instancie EventEmitter et je déclare qu'il émet vers le composant parent
  @Output() loginEventEmitter = new EventEmitter<string>();
  @Output() logNotificationEventEmitter = new EventEmitter<number>();


  constructor(private formBuilder: FormBuilder, private _requestToSmartReportingBatch: RequestToSmartReportingBatchService) { }

  ngOnInit() {

    // Modèle du formulaire
    this.loginForm = this.formBuilder.group({  // Crée une instance de FormGroup
      adminpseudo: [],                   // Crée une instance de FormControl
      adminpassword: [],                   // Crée une instance de FormControl
    });

    // récupération du service de connexion à smartReportingBatch
    this.requestToSmartReportingBatch = this._requestToSmartReportingBatch;
  }

  // lance la requête pour authentification
  login() {    

    // Si les champs du formulaire ne sont pas vides
    if(this.loginForm.value.adminpseudo && this.loginForm.value.adminpassword){

      // Utilisation du service << requestToSmartReportingBatch >>
      this.requestToSmartReportingBatch.login(this.loginForm.value).subscribe(

        res => { // Si la requête aboutit correctement
          console.log('HTTP response', res);
          this.requestToSmartReportingBatch.apiResponseOK = res;
          this.requestToSmartReportingBatch.apiResponseError = "";

          // Récupération du token
          const token = this.requestToSmartReportingBatch.apiResponseOK.token;

          // stockage du token
          localStorage.setItem("token", token);

          // Affichage du token ( à supprimer pour le développement bien sûr ! )
          alert("TOKEN :" + token);

          this.requestToSmartReportingBatch.checkLogNotification()
            .subscribe(
              res => {
                res = res.log_notification;
                this.nbrOfNotifications = res;
                console.log("Nombre de notifications : ", res);

                // Envoie au composant parent le nombre de notifications dûes au log
                this.sendToParentAboutLogNotifications(this.nbrOfNotifications);

                 /* Déclenchement de la méthode qui informe le 
                composant parent que l'admin est connecté 
                avec pour objectif de supprimer ce composant du DOM */
                this.sendToParentAboutLogin("conneted");             
              },
              err => {console.log("Failed to retrieve number of notifications")},
              () => {console.log("Checking log notifications completed")},

            );
          


         

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

  // Méthode qui envoie l'information au parent comme quoi l'admin est connecté
  sendToParentAboutLogin(data){
    this.loginEventEmitter.emit(data);
  }

  // Méthode qui envoie le nombre de log notifications au composang parent
  sendToParentAboutLogNotifications(nbrOfNotifications){
    this.logNotificationEventEmitter.emit(nbrOfNotifications);
  }

}
