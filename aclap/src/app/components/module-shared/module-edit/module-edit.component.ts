import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Controller } from '../../../services/control/Controller.service';
import { Section, Module, ParagraphSection, ActivitySection, Question, ImageSection, TitleSection, TitleSectionSize, YoutubeVideoSection } from '../../../models';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss']
})
export class ModuleEditComponent implements OnInit {

  id: string;
  module: Module;
  sections: Section[];
  imageProxy: Map<String, File>;
  moduleImage: ImageSection;
  bannerImage: ImageSection;
  questions: Question[];
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  public sectionButtonsCollapsed = true;

  constructor(private route:ActivatedRoute, private controller: Controller, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));
    
    this.controller.getSections(this.id)
      .then(sections => { this.sections = sections; //Returns ordered list
      })
      .catch(error => console.error(error)
    );
    this.imageProxy = new Map();
    this.questions = new Array();
  }

  
  checkStatus(){
    console.log(this.sections);
  }
  
  addSection(index: number){
    let newSection: Section;
    switch (index) {
      case 0: //Activity
        newSection = new ActivitySection(null,this.sections.length,"",10,"",new Array<Question>());
        break;
      case 1: //Image
        newSection = new ImageSection(null,this.sections.length,"","","");
        break;
      case 2: //Paragraph
        newSection = new ParagraphSection(null,this.sections.length,"")
        break;
      case 3: //Title
        newSection = new TitleSection(null,this.sections.length,TitleSectionSize.H1,"");
        break;
      case 4: //Youtube
        newSection = new YoutubeVideoSection(null,this.sections.length,"");
        break;
      default:
        break;
    }
    this.sections.push(newSection);
    this.sectionButtonsCollapsed=true;
  }

  async submitSections(){
    //Submit Module
    //Submit Sections
    //Go to module Display Page
    
    this.controller.updateImplementable(this.module.id, this.module).then(
      _ => {
        //All Good
        console.log("module");
      }).
      catch(err => {
      //TODO: Display Error
      console.log(err);
    });

    const sect = this.sections.map(async (section:Section) => {
      let sect_response: Section;
      if(section instanceof ImageSection && !section.url.startsWith("http")){
        const imagetarget = this.imageProxy[section.url];
        const imgUrl = await this.controller.upload(imagetarget).then(id => {
          return id;
        });
        const _section = {
          "id": section.id, 
          "index": section.index, 
          "footing": section.footing,
          "url": imgUrl, 
          "reference": section.reference};
          sect_response = await this.controller.setSection(_section, this.id, section.id);
      }else{
        sect_response = await this.controller.setSection(section, this.id, section.id);
      }
      section = sect_response;
    });

    const sects = await Promise.all(sect);
    console.log(sects);

    //Display modal that everithing worked fine

  }

}
