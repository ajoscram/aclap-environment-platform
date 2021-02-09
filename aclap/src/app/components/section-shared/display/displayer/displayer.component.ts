import { Component, OnInit, Input } from '@angular/core';
import { Section, ActivitySection, ImageSection, ParagraphSection, TitleSection, YoutubeVideoSection } from '../../../../models';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.scss']
})
export class DisplayerComponent implements OnInit {

  @Input() sections: Array<Section>; 

  constructor() { }

  ngOnInit(): void {
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
