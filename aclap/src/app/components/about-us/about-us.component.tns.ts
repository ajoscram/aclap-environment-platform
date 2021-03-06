import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Utils } from '@nativescript/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) { }

  bg_img = "https://i.imgur.com/MLut5Fc.jpeg";

  aboutUsText: string = "El Área de Conservación La Amistad Pacífico (ACLA-P) abarca la mayor parte de la Cordillera de Talamanca en su vertiente del Pacífico. Conformada por partes terrestres que se elevan muy cercano al nivel del mar hasta la formación de mayor altitud en el Parque Nacional Chirripó. Genera servicios ambientales para la producción hidroeléctrica del país y agua de consumo humano para la mayor parte de los habitantes del Valle Central por medio  del Parque Nacional Tapantí Macizo de la Muerte, Reserva Forestal Río Macho y la Zona Protectora Río Navarro Río Sombrero, garantizando la afluencia de aguas para suplir necesidades de las poblaciones actuales y futuras.\nComparte con el Área de Conservación La Amistad Caribe, el Parque Internacional La Amistad, Sitio de Patrimonio Mundial y Reserva de la Biosfera, de excepcional valor científico, de conservación y belleza natural, que junto con la Zona Protectora Las Tablas, caracterizada  por ser un  banco genético de comunidades forestales de gran importancia y poseer una gran recarga acuífera que alimenta a varias comunidades del Cantón de Coto Brus, se extienden hasta la frontera con Panamá.\nSu superficie está formada por gran diversidad de ecosistemas, variedad de microhábitats, robledales puros, bosque nubosos de altura, sabanas de altura y representaciones muy particulares y únicas en el país como: extenso páramo (con rasgos andinos), presencia glacial, presencia de humedales tipo turberas denominados Sitios Ramsar, las temperaturas más bajas (-9ºC), el sitio más alto (3.820 metros de altura sobre el nivel del mar) y más de 30 lagos de origen glacial.\nLos recursos sobresalientes de conservación de esta área son: bosque tropical húmedo y muy húmedo, nuboso, pluvial; páramos, protección de cantidad y calidad de aguas y más.​"

  ngOnInit(): void {

  }

  openLink(link): void{
    Utils.openUrl(link);
  }


}
