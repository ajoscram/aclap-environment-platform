import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Controller } from '../../../services/control/Controller.service';
import { Section, Module, ParagraphSection, ActivitySection, Question, ImageSection, TitleSection, TitleSectionSize, YoutubeVideoSection, File } from '../../../models';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

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
  files: any[] = [];
  moduleImage: ImageSection;
  bannerImage: ImageSection;
  moduleFiles: File[] = [];
  deletedModuleFiles: File[] = [];
  questions: Question[];
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  public sectionButtonsCollapsed = true;

  constructor(private route:ActivatedRoute, private controller: Controller, private router: Router, private translator: ErrorTranslator) {
    this.id = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.controller.getImplementable(this.id)
      .then(module => { 
        this.module = <Module> module 
        this.moduleImage = new ImageSection("",0,"",module.imageUrl,"");
        this.bannerImage = new ImageSection("",0,"",module.bannerImageUrl,"");
      })
      .catch( err => { alert(this.translator.translate(err)); });
    
    this.controller.getSections(this.id)
      .then(sections => { this.sections = sections; //Returns ordered list
      })
      .catch( err => { alert(this.translator.translate(err)); });
    this.imageProxy = new Map();
    this.questions = new Array();

    this.controller.getFiles(this.id)
    .then(
      (files) =>{
        this.moduleFiles = files;
      }
    )
    .catch( err => { alert(this.translator.translate(err)); });

    this.controller.getQuestions(this.id)
      .then(
        (questions) => {
          this.questions = questions;
        }
      )
      .catch( err => { alert(this.translator.translate(err)); });
  }

  
  checkStatus(){
    console.log(this.sections);
  }
  
  addSection(index: number){
    let newSection: Section;
    switch (index) {
      case 0: //Activity
        newSection = new ActivitySection('',this.sections.length,"",10,"");
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
    //Submit Module
    //Submit Sections
    //Go to module Display Page
    let gotError: boolean = false;

    /* Upload image and banner of the module */
    try{
      if(!this.moduleImage.url.startsWith('http')   && this.moduleImage.url != ''){
        this.moduleImage.url = await this.controller.upload(this.imageProxy[this.moduleImage.url])
        .then(
          url => {
            return url;
          })
      }
    }catch(err){
      alert(this.translator.translate(err)); gotError = true;
    }

    try{
      if(!this.bannerImage.url.startsWith('http')   && this.bannerImage.url != ''){
        this.bannerImage.url = await this.controller.upload(this.imageProxy[this.bannerImage.url]).then(
          url => {
            return url;
          }
        );
      }
    }catch(err){
      alert(this.translator.translate(err)); gotError = true;
    }

    this.module.imageUrl = this.moduleImage.url;
    this.module.bannerImageUrl = this.bannerImage.url;
    /* */

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

    this.controller.updateImplementable(this.module.id, this.module).then(
      module => {
        //All Good
        console.log(module);
      })
      .catch( err => { alert(this.translator.translate(err)); gotError = true; });

    this.deletedModuleFiles.forEach(
      (file: File) => {
        this.controller.deleteFile(this.id, file.id)
        .then(_ => {})
        .catch( err => { alert(this.translator.translate(err)); gotError = true; });
      }
    );

    this.files.forEach(
      (file) => {
        this.controller.addFile(this.id, file)
        .then( _ => {})
        .catch( err => { alert(this.translator.translate(err)); gotError = true; });
      }
    );

    this.questions.forEach(
      (question) => {
        this.controller.setQuestion(question, this.id, question.id).then(_ => {})
        .catch( err => { alert(this.translator.translate(err)); gotError = true; });
      }
    );

    //Display modal that everithing worked fine
    if(gotError){
      return;
    }else{
      alert("Contenido del módulo actualizado de manera correcta");
      this.router.navigateByUrl(`/modulos/${this.route.snapshot.paramMap.get('id')}`);
    }

  }

}
