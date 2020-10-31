import { Component, ViewChild} from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aclap';

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit(): void { }

  @ViewChild(RadSideDrawerComponent) sideDrawerComponent: RadSideDrawerComponent;

  navigateToHome(): void {
      this.routerExtensions.navigate(['inicio'], { clearHistory: true });
      this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

  navigateToModules(): void {
      this.routerExtensions.navigate(['modulos'], { clearHistory: true });
      this.sideDrawerComponent.sideDrawer.closeDrawer();
  }

}
