import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Vote } from 'src/app/interfaces/vote';
import { CrudService } from 'src/app/services/crud.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kamilorder',
  templateUrl: './kamilorder.component.html',
  styleUrls: ['./kamilorder.component.scss']
})
export class KamilorderComponent implements OnInit {
  kamiller: any[];
  votesForToday: any[];
  date: Date;
  username: string;
  vote: Vote;
  allVotes: Vote[];
  today: Vote[];
  month: Vote[];
  week: Vote[];
  isVoted: boolean;
  archTotal: number=0;
  tarchieTotal: number=0;
  batusTotal: number=0;
  hamitTotal: number=0;
  archMonth: number=0;
  tarchieMonth: number=0;
  batusMonth: number=0;
  hamitMonth: number=0;
  archToday: number=0;
  tarchieToday: number=0;
  hamitToday: number=0;
  batusToday: number=0;
  constructor(private ar: ActivatedRoute, private crudService: CrudService) {
    this.username = this.ar.snapshot.queryParams.username;
    this.vote = new Vote();
    // this.allVotes= this.crudService.getAllVotes();

  }
  kamilDataOverall = [

  ];
  kamilDataMonth = [

  ];
  kamilDataToday = [

  ];
  todos = [
    {
      name: "Hasan Can Kavak",
      nickname: "Archie",
      imgPath: "archie.jpeg",
      desc: "Archie kamillikte sınırlı şeyler yaptığı için mümkün olduğunca son sıralarda görülmekte ve görülmelidir."
    },
    {
      name: "Hüseyin Yıldız",
      nickname: "Tarchie",
      imgPath: "tarchie.jpeg",
      desc: "Tarchie kamillikte sınır tanımayan bir arkadaşımız...Mümkün olduğunca en üst sıralardadır."
    },
    {
      name: "Deniz Arslan",
      nickname: "Hamit",
      imgPath: "denizinyo.jpeg",
      desc: "Deniz grubun tek dişi kamilidir ve hırsı ve alyanaklarıyla bilinir oda Tarchie kodadlı şahıs gibi mümkün olduğunca en üst sıralardadır."
    },
    {
      name: "Batuhan Kırat",
      nickname: "Lamer",
      imgPath: "batus.jpeg",
      desc: "Batuş grubun winner kamilidir ve defansı ve cs wall hackiyle bilinir :D  genel olarak ortalama bir kamildir"
    }
  ];

  completed = [
  ];

  ngOnInit() {
   
    this.crudService.getAllVotes().subscribe(data => {
      this.kamilDataToday=[];
      this.kamilDataMonth=[];
      this.kamilDataOverall=[];
      this.allVotes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Vote
        } as Vote;
      }
      )
      var now = new Date();
      var lastMonth = new Date(new Date().setMonth(now.getMonth() - 1));
      this.today = this.allVotes.filter(x => x.voteDate.toLocaleDateString() == now.toLocaleDateString());
      this.month = this.allVotes.filter(x => x.voteDate.toLocaleDateString() > lastMonth.toLocaleDateString());

      //EVER
      this.allVotes.forEach(vote => {
        this.archTotal += vote.archie,
        this.batusTotal += vote.batus;
        this.tarchieTotal += vote.tarchie;
        this.hamitTotal += vote.deniz;
      });

      var arch = {
        name: 'Hasan Can',
        shortName: 'Archie',
        image: 'archie.jpeg',
        count: this.archTotal
      }
      var batus = {
        name: "Batuhan",
        shortName: 'Batuş',
        image: 'batus.jpeg',
        count: this.batusTotal
      }
      var hamit = {
        name: 'Deniz',
        shortName: 'Hamit',
        image: 'denizinyo.jpeg',
        count: this.hamitTotal
      }
      var tarchie = {
        name: 'Hüseyin',
        shortName: 'Tarchie',
        image: 'tarchie.jpeg',
        count: this.tarchieTotal
      }
      this.kamilDataOverall.push(tarchie, hamit, batus, arch);
      this.kamilDataOverall = this.kamilDataOverall.sort(function(a, b) {
        return (a.count - b.count);   });
        //ever


           //month
      this.month.forEach(vote => {
        this.archMonth += vote.archie,
        this.batusMonth += vote.batus;
        this.tarchieMonth += vote.tarchie;
        this.hamitMonth += vote.deniz;
      });

      var arch = {
        name: 'Hasan Can',
        shortName: 'Archie',
        image: 'archie.jpeg',
        count: this.archMonth
      }
      var batus = {
        name: "Batuhan",
        shortName: 'Batuş',
        image: 'batus.jpeg',
        count: this.batusMonth
      }
      var hamit = {
        name: 'Deniz',
        shortName: 'Hamit',
        image: 'denizinyo.jpeg',
        count: this.hamitMonth
      }
      var tarchie = {
        name: 'Hüseyin',
        shortName: 'Tarchie',
        image: 'tarchie.jpeg',
        count: this.tarchieMonth
      }
      this.kamilDataMonth.push(tarchie, hamit, batus, arch);
      this.kamilDataMonth = this.kamilDataMonth.sort(function(a, b) {
        return (a.count - b.count);   });
        //month
               //Today
      this.today.forEach(vote => {
        this.archToday += vote.archie,
        this.batusToday += vote.batus;
        this.tarchieToday += vote.tarchie;
        this.hamitToday += vote.deniz;
      });

      var arch = {
        name: 'Hasan Can',
        shortName: 'Archie',
        image: 'archie.jpeg',
        count: this.archToday
      }
      var batus = {
        name: "Batuhan",
        shortName: 'Batuş',
        image: 'batus.jpeg',
        count: this.batusToday
      }
      var hamit = {
        name: 'Deniz',
        shortName: 'Hamit',
        image: 'denizinyo.jpeg',
        count: this.hamitToday
      }
      var tarchie = {
        name: 'Hüseyin',
        shortName: 'Tarchie',
        image: 'tarchie.jpeg',
        count: this.tarchieToday
      }
      this.kamilDataToday.push(tarchie, hamit, batus, arch);
      this.kamilDataToday = this.kamilDataToday.sort(function(a, b) {
        return (a.count - b.count);   });
        //day
      if (this.today.filter(x => x.creator == this.username).length > 0)
        this.isVoted = true;
    });

  }


  sendVotes(votes) {
    //console.log(votes);
    this.date = new Date();
    this.vote.creator = this.username;
    this.vote.voteDate = this.date;
    for (var i = 0; i < votes.length; i++) {
      if (votes[i].nickname == 'Hamit')
        this.vote.deniz = i + 1;
      if (votes[i].nickname == 'Tarchie')
        this.vote.tarchie = i + 1;
      if (votes[i].nickname == 'Lamer')
        this.vote.batus = i + 1;
      if (votes[i].nickname == 'Archie')
        this.vote.archie = i + 1;
    }
    this.crudService.addVote(this.vote);
    this.isVoted = CrudService.isVotedToday;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
