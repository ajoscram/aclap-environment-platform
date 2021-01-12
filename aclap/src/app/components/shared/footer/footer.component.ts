import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  allies: string[] = ["MINAE", "SINAC", "ACLAP", "PAISAJES PRODUCTIVOS", "PNUD", "GEF", "TEC"];
  constructor() { }

  ngOnInit(): void {
  }

}
