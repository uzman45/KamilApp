import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Vote } from '../interfaces/vote';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { KamilorderComponent } from '../components/kamilorder/kamilorder.component';
import { ResultsComponent } from '../components/results/results.component';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  votes: Observable<Vote>[];
  static showSnackbar:any;
  static snackBar: MatSnackBar;
  static isVotedToday:boolean;
  private itemsCollection: AngularFirestoreCollection<Vote>;
  constructor(private db: AngularFirestore,private sb:MatSnackBar) { 
    CrudService.showSnackbar =(message: string, type?: string) => {
      this.sb.open(message, 'X', {
        duration: 5000,
        panelClass: ['snack-' + type]
      });
    }
    this.itemsCollection = db.collection<Vote>('votes');
  }

  getAllVotes(){
    return this.db.collection('votes').snapshotChanges();

  }
  addVote(vote:Vote){
    
    this.db.collection("votes").add({
      archie: vote.archie,
      batus:  vote.batus,
      creator: vote.creator,
      deniz  :vote.deniz,
      tarchie:vote.tarchie,
      voteDate:vote.voteDate
  })
  .then(function() {
    CrudService.isVotedToday=true;
    CrudService.showSnackbar("Başarıyla bugünkü KAMİLLİK görevini yerine getirdin :D",
    'success'
  );
      console.log("Document successfully written!");
     
  })
  .catch(function(error) {
    CrudService.isVotedToday=false;
    CrudService.showSnackbar("Sorun oluştu KAMİL :D",
      'danger'
    );
      console.error("Error writing document: ", error);
    
  });
  
  }

}
