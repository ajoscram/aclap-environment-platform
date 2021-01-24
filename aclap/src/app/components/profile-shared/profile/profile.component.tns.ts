import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Implementation, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  implementationsCompleted: Implementation[] = [];
  implementationsIncomplete: Implementation[] = [];

  user: User;

  constructor(private controller: Controller, public datepipe: DatePipe, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {

    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    );

    this.controller.getImplementations(true).then(
      implentations => {this.implementationsCompleted = implentations}
    );

    this.controller.getImplementations(false).then(
      implentations => {this.implementationsIncomplete = implentations}
    );

  }

  formatDate(date: Date): string {
    return this.datepipe.transform(date, 'dd-MM-yyyy');
  }

  logout(): void{
    this.controller.logout();
    this.routerExtensions.navigate(['inicio'], { clearHistory: true });
  }

}
