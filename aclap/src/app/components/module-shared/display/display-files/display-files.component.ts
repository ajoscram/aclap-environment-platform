import { Component, Input, OnInit } from '@angular/core';
import { File } from '@src/app/models';

@Component({
  selector: 'app-display-files',
  templateUrl: './display-files.component.html',
  styleUrls: ['./display-files.component.scss']
})
export class DisplayFilesComponent implements OnInit {

  constructor() { }

  @Input() files: File[] = [];

  ngOnInit(): void {
  }
  onDownload(index: number){
    window.open(this.files[index].url);
  }

}
