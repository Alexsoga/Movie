import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator} from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject} from 'rxjs';
  export interface Order {
    
  
  displayName:any;
  email:any;
  uid:any;

  }
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  {
  displayedColumns = ['displayname','email','uid'];
  dataSource: MatTableDataSource<Order>; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private afs: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit() {
  }
  ngAfterViewInit() 
  {
  
    this.afs.collection<Order>('Users').valueChanges().subscribe(data => {
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

}
