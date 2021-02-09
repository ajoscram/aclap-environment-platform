import { Component, OnInit, Input } from '@angular/core';
import { Section, Module, ActivitySection, ImageSection, ParagraphSection, TitleSection, YoutubeVideoSection } from '../../../../models';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../../../services/control/Controller.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.scss']
})
export class DisplayerComponent implements OnInit {

  module: Module;
  sections: Section[];
  id: string;

  constructor(private route:ActivatedRoute, private controller: Controller) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));

    this.controller.getSections(this.id)
    .then(sections => { this.sections = sections; 
      this.sections = this.sections.sort(
        (obj1, obj2) => {
          if (obj1.index > obj2.index) {
            return 1;
          }
          if (obj1.index < obj2.index){
            return -1;
          } 
          return 0;
        }
      );
    })
    .catch(error => console.error(error));
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
