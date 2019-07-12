import { Component, OnInit } from '@angular/core';
declare var videojs: any;
import {AuthService} from '../auth.service'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
tvlink;
  constructor(private auth:AuthService) { }

  ngOnInit() {
    var player = videojs('hls-example');
player.play();
  }

  ngAfterViewInit() {
    this.auth.bslinks.subscribe(links=>this.tvlink=links);
    this.auth.bslinks.subscribe(links=>console.log(links));
  }
  

}
