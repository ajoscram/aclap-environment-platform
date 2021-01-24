import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
  }

  navigateToModules(): void {
      this.routerExtensions.navigate(['modulos'], { clearHistory: false });
  }

  navigateToEvents(): void {
    this.routerExtensions.navigate(['events'], { clearHistory: false });
  }

  navigateToEducatorApplication(): void {
    this.routerExtensions.navigate(['educatorApplication'], { clearHistory: false });
  }

}
