import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Controller } from '@src/app/services/control/Controller.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isNavbarCollapsed=true;
  loggedIn=false;
  index = 0;


  colors = ["#1c81a9","#688f0e","#596668","","",""];

  constructor(private modalService: NgbModal, private controller: Controller,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.controller.getUser()
      .then(user => {
        if(user){
          this.loggedIn = true;
        }
      });
  }

  changeIndex(n: number){
    this.index = n;
  }

  logout(){
    this.controller.logout().then(
      _ => {
        window.location.reload();
      }
    );
  }

  openLogin(){
    const loginRef = this.modalService.open(LoginComponent, { size: 'xl' });
  }
  
}
