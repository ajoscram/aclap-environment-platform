import { Component, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { ActivitySection, Discipline, ImageSection, 
  Module, ParagraphSection, Question, Section, 
  TitleSection, TitleSectionSize, YoutubeVideoSection } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {

  module: Module;
  id: string;
  sections: Section[];
  questions: Question[];
  files: any[] = [];
  moduleImage: ImageSection;
  bannerImage: ImageSection;
  imageProxy: Map<String, File>;
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  public sectionButtonsCollapsed = true;

  constructor(private controller: Controller, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.module = new Module("","","rgb(35,175,229)","","","","","","6 a 9 años","","", new Array<Discipline>());
    this.sections = new Array<Section>();
    this.questions = new Array<Question>();
    this.moduleImage = new ImageSection("",0,"",this.module.imageUrl,"");
    this.bannerImage = new ImageSection("",0,"",this.module.bannerImageUrl,"");
    this.imageProxy = new Map();
  }

  addSection(index: number){
    let newSection: Section;
    switch (index) {
      case 0: //Activity
        newSection = new ActivitySection("",this.sections.length,"",10,"");
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

  async submitSections(){

    /* Upload image and banner of the module */
    if(!this.moduleImage.url.startsWith('http')){
      this.moduleImage.url = await this.controller.upload(this.imageProxy[this.moduleImage.url]).then(
        url => {
          return url;
        }
      );
    }
    if(!this.bannerImage.url.startsWith('http')){
      this.bannerImage.url = await this.controller.upload(this.imageProxy[this.moduleImage.url]).then(
        url => {
          return url;
        }
      );
    }

    this.module.imageUrl = this.moduleImage.url;
    this.module.bannerImageUrl = this.bannerImage.url;
    /* */
    
    const uploadingModule = this.controller.addImplementable(this.module).then(
      module => {
        this.id = module.id;
      }
    );

    await uploadingModule;


    const sect = this.sections.map(async (section:Section) => {
      const sect_response = await this.controller.setSection(section, this.id, section.id);
      return sect_response;
    });

    const sects = await Promise.all(sect);
    console.log(sects);

    alert("Contenido del módulo actualizado de manera correcta");
    this.router.navigateByUrl(`/modulos/${this.id}`);

  }

}
