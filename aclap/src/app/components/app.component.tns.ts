import { Component, ViewChild} from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { Controller } from '../services/control/Controller.service';
import { firebase } from '@nativescript/firebase';

declare let process: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACLA-P EDUCA';

  constructor(private controller: Controller, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {

    firebase.init()
    .then( r =>{
      console.log("Firebase se inicio correctamente")
    })
    .catch(error =>{
      console.log("Hubo un error: ", error)
    })

  }

  @ViewChild(RadSideDrawerComponent) sideDrawerComponent: RadSideDrawerComponent;

  navigateToProfile_Login(): void {
    this.controller.getSession()
    .then(_ => {
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

  navigateToAboutUs(): void {
    this.routerExtensions.navigate(['about'], { clearHistory: false });
    this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToAllies(): void {
    this.routerExtensions.navigate(['allies'], { clearHistory: false });
    this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

}
