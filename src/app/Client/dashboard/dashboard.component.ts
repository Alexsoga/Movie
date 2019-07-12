import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from '../auth.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
movie;

  constructor(private afs: AngularFirestore, private auth:AuthService) { }
 
  ngOnInit() {
    this.movie= this.afs.collection('movie').valueChanges();
  }

  load(link){
    
this.auth.updatelink(link);
  }
  


}
