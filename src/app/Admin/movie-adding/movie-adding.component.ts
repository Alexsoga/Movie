import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl,NgForm} from '@angular/forms';
import {AngularFirestore,  AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import{ AngularFireStorage} from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-movie-adding',
  templateUrl: './movie-adding.component.html',
  styleUrls: ['./movie-adding.component.css']
})
export class MovieAddingComponent implements OnInit {
  downloadURL : Observable<string | null>;
  profilepicRef: any;
  uploads: any[];
  allPercentage: Observable<any>;
  files: Observable<any>;
  userid:any;
  constructor(private afs:AngularFirestore,private afAuth : AngularFireAuth,private storage: AngularFireStorage,) { }

  ngOnInit() {
    
  }
  add(a, b, c){
    const d = new Date();
    const db = this.afs.doc(`movie/${a}`)
    const details = {
     title: a,
     description : b,
     link : c,
     create: d,
     update: d,
     uid: this.afAuth.auth.currentUser.uid
  }
  return db.update(details);

   

  }
  upload(event,a) {
    this.userid = this.afAuth.auth.currentUser.uid;
    console.log(this.userid);
    this.uploads = [];
  const filelist = event.target.files;
  const allPercentage: Observable<number>[] = [];

  for (const file of filelist) {

    const path = this.userid+'/'+this.afAuth.auth.currentUser.displayName+'/'+a+'/'+file.name;
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
        return this.afs.doc(`movie/${a}`).set({
         
          url: url
        });
      })
    })

  }

  }

}
