import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event, ImageSection } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-edit-event-info',
  templateUrl: './edit-event-info.component.html',
  styleUrls: ['./edit-event-info.component.scss']
})
export class EditEventInfoComponent implements OnInit {

  @Input() module: Event;
  @Input() imageProxy: Map<String, File>;

  @Input() moduleImage: ImageSection;
  @Input() bannerImage: ImageSection;

  colors: Array<string> = ["rgb(35,175,229)","rgb(82,143,65)","rgb(239,100,35)","rgb(250,182,33)"];
  selected: string = this.colors[0];
  
  moduleForm: FormGroup;
  ageRange: any[];

  constructor(private controller: Controller, private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.moduleForm = this.builder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      imageUrl: ['', Validators.required],
      bannerImageUrl: ['', Validators.required],
      recommendedAge: ['', Validators.required],
      objective: ['', Validators.required],
      antecedents: ['', Validators.required],
      date: ['', Validators.required]      
    });
    this.ageRange = ["6 a 9 años", "10 a 12 años", "13 a 15 años", "16 a 18 años", "18 años en adelante"];
  }

  deleteModule():void {
    this.controller.deleteImplementable(this.module.id).then(
      _ => {
        this.router.navigateByUrl("/eventos");
      }
    );
  }

  setColor(i: number){
    this.selected = this.colors[i];
    this.module.color = this.selected;
  }

}