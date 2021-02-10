import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-header',
  templateUrl: './img-header.component.html',
  styleUrls: ['./img-header.component.scss']
})
export class ImgHeaderComponent implements OnInit {

  @Input() bg_img: string;
  @Input() credit: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
