import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File, Module } from '../../../../models';
import { Controller } from '../../../../services/control/Controller.service';

@Component({
  selector: 'app-display-files',
  templateUrl: './display-files.component.html',
  styleUrls: ['./display-files.component.scss']
})
export class DisplayFilesComponent implements OnInit {

  module: Module;
  files: File[];
  id: string;

  constructor(private route:ActivatedRoute, private controller: Controller) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));

    this.controller.getFiles(this.id)
    .then(files => { this.files = <File[]> files}) 
    .catch(error => console.error(error));
  }
}
