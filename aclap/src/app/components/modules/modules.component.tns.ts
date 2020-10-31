import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  constructor(private router: RouterExtensions, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToModules() {
    this.router.navigate(['../modules'], { relativeTo: this.route });
  }

}
