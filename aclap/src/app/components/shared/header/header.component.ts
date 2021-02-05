import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
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

  constructor(private modalService: NgbModal, private controller: Controller,private route: ActivatedRoute, private router: Router, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.controller.getSession()
      .then(user => {
        this.loggedIn = true;
      })
      .catch(err => { console.log(err)});
  }

  changeIndex(n: number){
    this.index = n;
  }

  logout(){
    this.controller.logout().then(
      _ => {
        window.location.reload();
      }
    )
    .catch(err => { console.log("log out")});
  }

  openLogin(){
    const loginRef = this.modalService.open(LoginComponent, { size: 'xl' });
  }
  
}
