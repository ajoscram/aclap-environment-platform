import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySection, Event, ImageSection, ParagraphSection, Question, Section, TitleSection, TitleSectionSize, YoutubeVideoSection } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  event: Event;
  id: string;
  sections: Section[];
  questions: Question[];
  files: any[] = [];
  eventImage: ImageSection;
  bannerImage: ImageSection;
  imageProxy: Map<String, File>;
  sectionOptions = ["Actividad","Imagen","Párrafo","Título / Subtítulo","Youtube"];
  public sectionButtonsCollapsed = true;

  constructor(private controller: Controller, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = new Event("","","rgb(35,175,229)","","","","","","",new Date("01/01/2021"));
    this.sections = new Array<Section>();
    this.questions = new Array<Question>();
    this.eventImage = new ImageSection("",0,"",this.event.imageUrl,"");
    this.bannerImage = new ImageSection("",0,"",this.event.bannerImageUrl,"");
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

    /* Upload image and banner of the event */
    if(!this.eventImage.url.startsWith('http')){
      this.eventImage.url = await this.controller.upload(this.imageProxy[this.eventImage.url]).then(
        url => {
          return url;
        }
      );
    }
    if(!this.bannerImage.url.startsWith('http')){
      this.bannerImage.url = await this.controller.upload(this.imageProxy[this.eventImage.url]).then(
        url => {
          return url;
        }
      );
    }

    this.event.imageUrl = this.eventImage.url;
    this.event.bannerImageUrl = this.bannerImage.url;
    /* */
    
    const uploadingModule = this.controller.addImplementable(this.event).then(
      event => {
        this.id = event.id;
      }
    );

    await uploadingModule;


    const sect = this.sections.map(async (section:Section) => {
      const sect_response = await this.controller.setSection(section, this.id, section.id);
      return sect_response;
    });

    const sects = await Promise.all(sect);
    console.log(sects);

    alert("Contenido del evento actualizado de manera correcta");
    this.router.navigateByUrl(`/eventos/${this.id}`);

  }

}