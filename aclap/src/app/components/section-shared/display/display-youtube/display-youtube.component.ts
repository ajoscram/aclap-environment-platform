import { Component, OnInit, Input } from '@angular/core';
import { YoutubeVideoSection } from '../../../../models';

@Component({
  selector: 'app-display-youtube',
  templateUrl: './display-youtube.component.html',
  styleUrls: ['./display-youtube.component.scss']
})
export class DisplayYoutubeComponent implements OnInit {

  @Input() video: YoutubeVideoSection;

  constructor() { }

  ngOnInit(): void {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  getId = (url: string): string => {
    let id = url.split('v=')[1].split('&')[0];
    console.log(id);
    return id;
  }

}
