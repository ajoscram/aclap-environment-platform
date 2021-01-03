import { Component, OnInit, Input } from '@angular/core';
import { Section, Module, Implementable, File } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../../services/control/Controller.service';
import { Role } from '@src/app/services/authentication/Session.model';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  module: Module;
  id: string;
  files: File[];
  showingFiles: boolean = false;
  isAdmin: boolean;

  constructor(private route:ActivatedRoute, private controller: Controller) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getSession().then(
      res => {
        if(res.role == Role.ADMINISTRATOR){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      }
    );

    this.controller.getFiles(this.id)
      .then(
        files => {
          this.files = files;
        }
      )

    this.showingFiles = false;

    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));
  }

  switchFiles(){
    this.showingFiles = !this.showingFiles;
    console.log(this.files)
  }

}
