import { Component, OnInit, Input } from '@angular/core';

// J'importe le service RequestToSmartReportingBatchService
import { RequestToSmartReportingBatchService } from '../service/RequestToSmartReportingBatch.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  // Va récupérer le service requestToSmartReportingBatchService
  requestToSmartReportingBatch: any;

  isConnected: string; // Affiche ou non le block de connexion
  nbrOfNotifications: number = 0; // Récupère depuis le composant enfant le nombre de notifications
  displayLoginForm: boolean = false;
  displayRegisterForm: boolean = false;
  displayPopMessage: boolean = false;
  popMessage: string;


  action1: boolean = false;
  action2: boolean = false;
  action3: boolean = false;

  constructor(private _requestToSmartReportingBatch: RequestToSmartReportingBatchService) { }

  ngOnInit() {
    // récupération du service de connexion à smartReportingBatch
    this.requestToSmartReportingBatch = this._requestToSmartReportingBatch;
  }

  // Méthode qui reçoit en paramètre l'évènement depuis le composant enfant (Connecté ou pas)
  loginEventReceiver($event){

    // Affectation de l'évènement qui vient du composant enfant
    this.isConnected = $event;
  };

  // Méthode qui reçoit en paramètre l'évènement depuis le composant enfant (nombre de notifications)
  logNotificationEventReceiver($event){

    // Affectation de l'évènement qui vient du composant enfant
    this.nbrOfNotifications = $event;
    console.log(this.nbrOfNotifications);
  };

  helloConsole(){
    console.log("coucou !");
  }

  // Méthode qui affiche un message provisoire
  showMessage(message){
    
    this.popMessage = message;
    this.displayPopMessage = true;
    setTimeout(() => {
      this.displayPopMessage = false;
    }, 3000);
  }

  getBatches(){
    this.requestToSmartReportingBatch.getBatches()
      .subscribe(
        res => {
          console.log("get batches response : ", res);
          this.showMessage('Récupération des lots terminée');
          this.requestToSmartReportingBatch.checkLogNotification()
            .subscribe(
              res => {
                res = res.log_notification;
                this.nbrOfNotifications = res;
                console.log("Number of notifications : ", res);           
              },
              err => {console.log("Failed to retrieve number of notifications")},
              () => {console.log("Checking log notifications completed")},

            );          
        },
        err => {console.error("get batches error : ", err);  },
        () => {console.log("Get batches completed")},

      );
  }

  linkMediaToMembers(){
    this.requestToSmartReportingBatch.linkMediaToMembers()
      .subscribe(
        res => {
          console.log("Link media to members response : ", res);
          this.showMessage('Répartition des médias terminée');
          this.requestToSmartReportingBatch.checkLogNotification()
            .subscribe(
              res => {
                res = res.log_notification;
                this.nbrOfNotifications = res;
                console.log("Number of notifications : ", res);           
              },
              err => {console.log("Failed to retrieve number of notifications")},
              () => {console.log("Checking log notifications completed")},

            );          
        },
        err => {console.error("get batches error : ", err);  },
        () => {console.log("Get batches completed")},

      );
  }

  

    
}
