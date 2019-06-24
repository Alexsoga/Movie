import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
movie;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.movie= this.afs.collection('movie').valueChanges();
  }

}
