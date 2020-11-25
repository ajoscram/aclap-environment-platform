import { Component, OnInit } from '@angular/core';
import { ActivitySection, Discipline, ImageSection, 
  Module, ParagraphSection, Question, Section, 
  TitleSection, TitleSectionSize, YoutubeVideoSection } from '../../models';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {

  module: Module;
  sections: Section[];
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  public sectionButtonsCollapsed = true;

  constructor() { }

  ngOnInit(): void {
    this.module = new Module("","","","","","","","",12,"","", new Array<Discipline>());
    this.sections = new Array<Section>();
  }

  addSection(index: number){
    let newSection: Section;
    switch (index) {
      case 0: //Activity
        newSection = new ActivitySection("",this.sections.length,"",10,"",new Array<Question>());
        break;
      case 1: //Image
        newSection = new ImageSection("",this.sections.length,"","","");
        break;
      case 2: //Paragraph
        newSection = new ParagraphSection("",this.sections.length,"")
        break;
      case 3: //Title
        newSection = new TitleSection("",this.sections.length,TitleSectionSize.H1,"");
        break;
      case 4: //Youtube
        newSection = new YoutubeVideoSection("",this.sections.length,"");
        break;
      default:
        break;
    }
    this.sections.push(newSection);
    this.sectionButtonsCollapsed=true;
  }

  checkStatus(){
    console.log(this.sections);
  }

}
