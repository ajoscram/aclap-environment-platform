import { Component, Input, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { ActivitySection, ImageSection, ParagraphSection, Section, TitleSection, YoutubeVideoSection } from '../../../models';
import { BaseForm } from '../BaseForm';

@Component({
  selector: 'app-edit-displayer',
  templateUrl: './edit-displayer.component.html',
  styleUrls: ['./edit-displayer.component.scss']
})
export class EditDisplayerComponent extends BaseForm implements OnInit {

  @Input() sections: Section[];
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  
  constructor(controller: Controller) { super() }

  ngOnInit(): void {
  }

  deleteSection(index: number){
    this.sections.splice(index,1);
  }

  isActivity(component: Section): boolean {
    return component instanceof ActivitySection;
  }

  isImage(component: Section): boolean {
    return component instanceof ImageSection;
  }

  isParagraph(component: Section): boolean {
    return component instanceof ParagraphSection;
  }

  isTitle(component: Section): boolean {
    return component instanceof TitleSection;
  }

  isYoutube(component: Section): boolean {
    return component instanceof YoutubeVideoSection;
  }

}
