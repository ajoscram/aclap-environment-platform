import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isNavbarCollapsed=true;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openLogin(){
    const loginRef = this.modalService.open(LoginComponent, { size: 'xl' });
  }
  
}
