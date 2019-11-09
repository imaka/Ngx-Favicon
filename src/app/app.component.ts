import { Component, OnInit } from '@angular/core';
import { AngularFaviconService } from 'projects/angular-favicon/src/lib/angular-favicon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private ngxFavicon: AngularFaviconService) {}

  title = 'angular-favicon';

  ngOnInit() {
    this.ngxFavicon.setFavicon(
      'https://angular.io/assets/images/logos/angular/angular_solidBlack.png',
      'https://angular.io/assets/images/logos/angular/angular.png'
    );
  }
}
