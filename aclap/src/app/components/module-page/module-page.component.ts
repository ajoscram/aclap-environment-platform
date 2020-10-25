import { Component, OnInit, Input } from '@angular/core';
import { Component, ImageComponent, Module, ParagraphComponent, TitleComponent, YoutubeVideoComponent } from '../../models';
import { TitleComponentSize } from '../../models/components/TitleComponent.model';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../services/control/Controller.service';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  module: Module;
  components: Component[];

  id: string;
  title = new TitleComponent("12", 0, TitleComponentSize.H2,"Hola");
  para = new ParagraphComponent("45", 1,"Mauris fermentum tincidunt elit, finibus tempor diam porttitor quis. Nam luctus rhoncus ultricies. Duis quis tellus lectus. Etiam vitae pulvinar augue, ac egestas ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat magna tincidunt arcu venenatis, sit amet cursus neque rutrum. Aliquam tempus sed turpis id porttitor. Phasellus suscipit justo sit amet tortor dapibus, in varius felis molestie. Cras ornare enim ut tellus tempor elementum. Donec consequat mollis felis porttitor laoreet. Vivamus nec tellus in dolor maximus blandit quis ut ante. Nulla tristique consectetur lorem et dapibus. Pellentesque non libero feugiat, iaculis velit in, egestas felis. Maecenas finibus eu mi ac dictum. Nunc eget metus eu eros pretium ullamcorper.\n\n"+
  "Nulla facilisis pellentesque lectus vel tristique. Sed vitae consectetur ipsum. Nam semper, arcu vehicula tempor iaculis, ipsum orci fringilla lectus, a imperdiet nunc tellus nec libero. Cras eget lectus quis turpis rhoncus faucibus eget ac est. In hac habitasse platea dictumst. In eu congue nisl. Aenean id ligula rhoncus, elementum lacus in, interdum nibh. Fusce egestas vel diam at fringilla.\n\n"+
  "Integer aliquet pellentesque dolor quis elementum. Nullam at euismod quam. Donec ornare fringilla scelerisque. Nunc aliquet auctor gravida. Suspendisse non condimentum lectus. Proin bibendum dapibus ligula, vitae placerat felis vulputate in. Vivamus maximus tellus vel quam sollicitudin, nec pellentesque ex porttitor. Nam rutrum tortor eget scelerisque cursus. In pharetra tempus magna quis consectetur. Sed justo metus, dictum quis pharetra eu, sagittis sit amet tellus. Praesent vulputate sapien non hendrerit faucibus. Nunc posuere diam in lectus auctor, et molestie lorem tincidunt. Etiam commodo ipsum magna, gravida hendrerit nulla faucibus eu. Aenean posuere, ligula et convallis laoreet, sem nisi laoreet nulla, vitae lacinia magna enim eu orci. Vestibulum turpis eros, accumsan et placerat quis, fringilla sed eros. Curabitur vel fringilla dui, lacinia convallis libero.");
  image = new ImageComponent("4", 2,"Manglar","https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg","Ovacen");
  video = new YoutubeVideoComponent("4798", 3,"https://www.youtube.com/watch?v=_WmvVJ43RoM");


  constructor(private route:ActivatedRoute, private controller: Controller) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getModule(this.id)
      .then(module => {
        this.module = module
      })
      .catch(error => console.error(error));
    
  }

}
