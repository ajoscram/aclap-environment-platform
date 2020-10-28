import { Component, OnInit } from '@angular/core';
import { Frame } from "tns-core-modules/ui/frame";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isNavbarCollapsed=true;
  constructor() { }

  ngOnInit(): void {
  }

  onOpenDrawerTap() {
    let sideDrawer: RadSideDrawer = <RadSideDrawer>(Frame.topmost().getViewById("sideDrawer"));
    sideDrawer.showDrawer();
  }

  onCloseDrawerTap() {
      let sideDrawer: RadSideDrawer = <RadSideDrawer>(Frame.topmost().getViewById("sideDrawer"));
      sideDrawer.closeDrawer();
  }

}
