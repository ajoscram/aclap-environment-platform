import { Component, OnInit } from '@angular/core';
import { SegmentedBar, SegmentedBarItem } from "@nativescript/core";

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
  
}
