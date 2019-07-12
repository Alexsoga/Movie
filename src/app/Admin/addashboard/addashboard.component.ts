import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator} from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators,FormControl,NgForm,NgModel} from '@angular/forms';
import { Observable } from 'rxjs';

import{ AngularFireStorage} from '@angular/fire/storage';
export interface Order {
  title:any;
  description:any;
  link:any;
  create:Date;
  update:Date;

}
@Component({
  selector: 'app-addashboard',
  templateUrl: './addashboard.component.html',
  styleUrls: ['./addashboard.component.css']
})
export class AddashboardComponent implements OnInit {
  displayedColumns = ['title','create','updated','edit/delete'];
  dataSource: MatTableDataSource<Order>; 
  
  movie;
  userid:any;
  downloadURL : Observable<string | null>;
  uploads: any[];
  allPercentage: Observable<any>;
  files: Observable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private afs: AngularFirestore,private storage: AngularFireStorage, public dialog: MatDialog,private afAuth: AngularFireAuth) {
    
  }
  ngOnInit(){
    
    
  }
  ngAfterViewInit() 
  {
    this.afs.collection<Order>('movie').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    
  }
  scheduleorder(a, c){
    const d = new Date();
    const db = this.afs.doc(`movie/${a}`)
    const details = {
     title: a,
     link : c,
     update: d
  }
  return db.update(details);
  }

  query(a:any){
    console.log(a);
    this.movie= this.afs.collection('movie',ref => ref.where
    ('title','==', a)).valueChanges();
   
  }
  
  upload(event,a) {
    this.userid = this.afAuth.auth.currentUser.uid;
    console.log(this.userid);
    this.uploads = [];
  const filelist = event.target.files;
  const allPercentage: Observable<number>[] = [];

  for (const file of filelist) {

    const path =  this.afAuth.auth.currentUser.uid+'/'+ this.afAuth.auth.currentUser.displayName+'/'+a+'/'+file.name;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    const _percentage$ = task.percentageChanges();
    allPercentage.push(_percentage$);

    // create composed object with different information. ADAPT THIS ACCORDING YOUR NEED
    const uploadTrack = {
      fileName: file.name,
      percentage: _percentage$
    }

    // push each upload into the array
    this.uploads.push(uploadTrack);

    // for every upload do whatever you want in firestore with the uploaded file
    const _t = task.then((f) => {
      return f.ref.getDownloadURL().then((url) => {
        return this.afs.doc(`movie/${a}`).update({
          url: url
        });
      })
    })

  }

  }
 
 
 
}
