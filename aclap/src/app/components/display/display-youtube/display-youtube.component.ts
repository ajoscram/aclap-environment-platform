import { Component, OnInit, Input } from '@angular/core';
import { YoutubeVideoComponent } from '@src/app/models/components/YoutubeVideoComponent.model';

@Component({
  selector: 'app-display-youtube',
  templateUrl: './display-youtube.component.html',
  styleUrls: ['./display-youtube.component.scss']
})
export class DisplayYoutubeComponent implements OnInit {

  @Input() video: YoutubeVideoComponent;

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
