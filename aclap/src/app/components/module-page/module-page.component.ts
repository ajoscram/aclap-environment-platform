import { Component, OnInit, Input } from '@angular/core';
import { Module } from '@src/app/models/implementables/Module.model'
import { YoutubeVideoComponent } from '@src/app/models/components/YoutubeVideoComponent.model';
import { ImageComponent } from '@src/app/models/components/ImageComponent.model';
import { ParagraphComponent } from '@src/app/models/components/ParagraphComponent.model';
import { TitleComponent } from '@src/app/models/components/TitleComponent.model';
import { TitleComponentSize } from '@src/app/models/components/TitleComponent.model';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  @Input() moduleId: number;
  module = {
    id: "1",
    name: "MODULO EJEMPLO 1",
    publisherId: "5",
    publisherName: "Jorge Mario",
    publisherLastname: "Alvarez Barquero",
    recommendedAge: 45,
    objectives: new Array("Duis quis nisl maximus, dignissim sapien sit amet, sodales est.", 
    "Duis eget mauris nec sapien fringilla imperdiet.",
    "Integer auctor lectus eget dolor suscipit laoreet."),
    requirements: new Array("Pellentesque pretium metus ac nisl accumsan, et aliquam dolor vehicula."),
    disciplines: [
      {
        subject: "Estudios sociales",
        year: "2do Año",
        theme: "#585FC2"
      },
      {
        subject: "Civica",
        year: "2do Año",
        theme: "#019CF6"
      },
      {
        subject: "Ciencias",
        year: "4to Año",
        theme: "#53A23C"
      },
      {
        subject: "Estudios sociales",
        year: "3er Año",
        theme: "#585FC2"
      },
      {
        subject: "Civica",
        year: "3er Año",
        theme: "#019CF6"
      },
      {
        subject: "Ciencias",
        year: "5to Año",
        theme: "#53A23C"
      }
    ]
  };

  title = new TitleComponent("12", 0,TitleComponentSize.H2,"Hola");
  para = new ParagraphComponent("45", 1,"Mauris fermentum tincidunt elit, finibus tempor diam porttitor quis. Nam luctus rhoncus ultricies. Duis quis tellus lectus. Etiam vitae pulvinar augue, ac egestas ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat magna tincidunt arcu venenatis, sit amet cursus neque rutrum. Aliquam tempus sed turpis id porttitor. Phasellus suscipit justo sit amet tortor dapibus, in varius felis molestie. Cras ornare enim ut tellus tempor elementum. Donec consequat mollis felis porttitor laoreet. Vivamus nec tellus in dolor maximus blandit quis ut ante. Nulla tristique consectetur lorem et dapibus. Pellentesque non libero feugiat, iaculis velit in, egestas felis. Maecenas finibus eu mi ac dictum. Nunc eget metus eu eros pretium ullamcorper.\n\n"+
  "Nulla facilisis pellentesque lectus vel tristique. Sed vitae consectetur ipsum. Nam semper, arcu vehicula tempor iaculis, ipsum orci fringilla lectus, a imperdiet nunc tellus nec libero. Cras eget lectus quis turpis rhoncus faucibus eget ac est. In hac habitasse platea dictumst. In eu congue nisl. Aenean id ligula rhoncus, elementum lacus in, interdum nibh. Fusce egestas vel diam at fringilla.\n\n"+
  "Integer aliquet pellentesque dolor quis elementum. Nullam at euismod quam. Donec ornare fringilla scelerisque. Nunc aliquet auctor gravida. Suspendisse non condimentum lectus. Proin bibendum dapibus ligula, vitae placerat felis vulputate in. Vivamus maximus tellus vel quam sollicitudin, nec pellentesque ex porttitor. Nam rutrum tortor eget scelerisque cursus. In pharetra tempus magna quis consectetur. Sed justo metus, dictum quis pharetra eu, sagittis sit amet tellus. Praesent vulputate sapien non hendrerit faucibus. Nunc posuere diam in lectus auctor, et molestie lorem tincidunt. Etiam commodo ipsum magna, gravida hendrerit nulla faucibus eu. Aenean posuere, ligula et convallis laoreet, sem nisi laoreet nulla, vitae lacinia magna enim eu orci. Vestibulum turpis eros, accumsan et placerat quis, fringilla sed eros. Curabitur vel fringilla dui, lacinia convallis libero.");
  image = new ImageComponent("4", 2,"Manglar", "https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg","Ovacen");
  video = new YoutubeVideoComponent("4798", 3,"https://www.youtube.com/watch?v=_WmvVJ43RoM");


  constructor() { }

  ngOnInit(): void {
    
  }

}
