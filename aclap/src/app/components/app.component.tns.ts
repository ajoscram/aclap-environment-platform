import { Component, ViewChild} from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '../services/control/Controller.service';
import { Session } from 'inspector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aclap';

  constructor(private controller: Controller, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {

  }

  @ViewChild(RadSideDrawerComponent) sideDrawerComponent: RadSideDrawerComponent;

  navigateToProfile_Login(): void {
    this.controller.getSession()
    .then(
      session => {
        this.routerExtensions.navigate(['perfil'], { clearHistory: false });
        this.sideDrawerComponent.sideDrawer.closeDrawer();
      })
    .catch(_ => {
      this.routerExtensions.navigate(['login'], { clearHistory: false });
      this.sideDrawerComponent.sideDrawer.closeDrawer();
    });
  }

  navigateToHome(): void {
      this.routerExtensions.navigate(['inicio'], { clearHistory: false });
      this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToModules(): void {
      this.routerExtensions.navigate(['modulos'], { clearHistory: false });
      this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToProfile(): void {
    this.routerExtensions.navigate(['perfil'], { clearHistory: false });
    this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToLogin(): void {
    this.routerExtensions.navigate(['login'], { clearHistory: false });
    this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToEducatorApplication(): void {
    this.routerExtensions.navigate(['educatorApplication'], { clearHistory: false });
    this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToEvents(): void {
    this.routerExtensions.navigate(['events'], { clearHistory: false });
    this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

}
