import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: RouterExtensions, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    this.router.navigate(['../inicio'], { relativeTo: this.route });
  }

}
