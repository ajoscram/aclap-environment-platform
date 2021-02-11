import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllySection } from '@src/app/models';

@Component({
  selector: 'app-edit-ally',
  templateUrl: './edit-ally.component.html',
  styleUrls: ['./edit-ally.component.scss']
})
export class EditAllyComponent implements OnInit {

  @Input() ally: AllySection;
  form: FormGroup;
  availableMinutes: any[];

  constructor() {  }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.requiredTrue),
      imageUrl: new FormControl('', Validators.requiredTrue),
      link: new FormControl('', Validators.requiredTrue)
    });
  }

  initializeForm(): FormGroup{
    return this.form;
  }


  getFormName(): string {
    return "EditActivity";
  }
}
