import { Component, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { ActivitySection, Discipline, ImageSection, 
  Module, ParagraphSection, Question, Section, 
  TitleSection, TitleSectionSize, YoutubeVideoSection } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

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

  constructor(private controller: Controller, private router: Router, private route: ActivatedRoute, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.module = new Module("","","#23aee5","","","","","","6 a 9 años","","", new Array<Discipline>());
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

    let promises: Promise<any>[] = [];
    let gotError: boolean = false;

    /* Upload image and banner of the module */
    try{
      if(!this.moduleImage.url.startsWith('http')  && this.moduleImage.url != ''){
        this.moduleImage.url = await this.controller.upload(this.imageProxy[this.moduleImage.url])
        .then(
          url => {
            return url;
          })
      }
    }catch(err){
      alert(this.translator.translate(err));
    }

    try{
      if(!this.bannerImage.url.startsWith('http')   && this.bannerImage.url != ''){
        this.bannerImage.url = await this.controller.upload(this.imageProxy[this.bannerImage.url]);
      }
    }catch(err){
      alert(this.translator.translate(err)); gotError = true;
    }

    this.module.imageUrl = this.moduleImage.url;
    this.module.bannerImageUrl = this.bannerImage.url;
    /* */
    try{
      const uploadingModule = await this.controller.addImplementable(this.module);
      this.id = uploadingModule.id;

      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
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
            "reference": section.reference
          };
          this.sections[i] = await this.controller.setSection(_section,this.id, section.id);
        }else{
          this.sections[i] = await this.controller.setSection(section, this.id, section.id);
        }
      };

    }catch(err){
      alert(this.translator.translate(err)); gotError = true;
    }

    this.files.forEach(
      (file) => {
        promises.push(this.controller.addFile(this.id, file));
      }
    );

    this.questions.map(
      (question, i) => {
        promises.push(this.controller.setQuestion(question, this.id, question.id));
      }
    );

    await Promise.all(promises)
      .then(
        _ => {
          alert("Contenido del módulo actualizado de manera correcta");
          this.router.navigateByUrl(`/modulos/${this.id}`);
        }
      )
      .catch(
        error => {
          this.translator.translate(error);
        }
      );
  }

}
