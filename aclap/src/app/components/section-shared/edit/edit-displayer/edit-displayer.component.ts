import { Component, Input, OnInit } from '@angular/core';
import { Controller } from '../../../../services/control/Controller.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ActivitySection, AllySection, ImageSection, ParagraphSection, Section, TitleSection, YoutubeVideoSection } from '../../../../models';

@Component({
  selector: 'app-edit-displayer',
  templateUrl: './edit-displayer.component.html',
  styleUrls: ['./edit-displayer.component.scss']
})
export class EditDisplayerComponent implements OnInit {

  @Input() sections: Section[];
  @Input() imageProxy: Map<String, File>;
  @Input() deletedSections: Section[] = [];
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube",""];
  
  constructor() { }

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
    }else if(this.isAlly(section)){
      return "Aliado";
    }else{
      return 'Sección';
    }
  }

  deleteSection(index: number){
    this.deletedSections.push(this.sections[index]);
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

  isAlly(component: Section): boolean {
    return component instanceof AllySection;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.sections.map((element, i) => { element.index = i });
  }


}
