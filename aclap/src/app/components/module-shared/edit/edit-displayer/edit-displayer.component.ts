import { Component, Input, OnInit } from '@angular/core';
import { Controller } from '../../../../services/control/Controller.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ActivitySection, ImageSection, ParagraphSection, Section, TitleSection, YoutubeVideoSection } from '../../../../models';
import { BaseForm } from '../BaseForm';

@Component({
  selector: 'app-edit-displayer',
  templateUrl: './edit-displayer.component.html',
  styleUrls: ['./edit-displayer.component.scss']
})
export class EditDisplayerComponent extends BaseForm implements OnInit {

  @Input() sections: Section[];
  @Input() imageProxy: Map<String, File>;
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  
  constructor(controller: Controller) { super() }

  ngOnInit(): void {
  }

  getTitle(section: Section): string{
    if(this.isActivity(section)){
      return "Actividad";
    }else if(this.isImage(section)){
      return "Imagen";
    }else if(this.isParagraph(section)){
      return "Párrafo";
    }else if(this.isTitle(section)){
      return "Título / Subtítulo";
    }else if(this.isYoutube(section)){
      return "Youtube";
    }else{
      return '';
    }
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.sections.map((element, i) => { element.index = i });
  }


}
