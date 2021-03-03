import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  public url = window.location.origin

  bg_img = "https://i.imgur.com/MLut5Fc.jpeg";
  credit = " Erik Solano Rojas";

  aboutUsText: string = "El Área de Conservación La Amistad Pacífico (ACLA-P) abarca la mayor parte de la Cordillera de Talamanca en su vertiente del Pacífico. Conformada por partes terrestres que se elevan muy cercano al nivel del mar hasta las formaciones de mayor altitud del país ubicadas en el Parque Nacional Chirripó y el Parque Internacional La Amistad. El ACLA-P contiene Sitios de Patrimonio Mundial y Reservas de la Biosfera, de excepcional valor científico, de conservación y belleza natural. Incluye también otras áreas silvestres protegidas como la Reserva Forestal Los Santos y la Zona Protectora Las Tablas, caracterizadas por ser un banco genético de comunidades forestales de gran importancia y poseer zonas de recarga acuífera que abastecen de agua potable a muchas comunidades de los cantones de Pérez Zeledón y Coto Brus.\nSu superficie está cubierta por gran variedad de ecosistemas y microhábitats, bosques de robledal, bosques nubosos y representaciones muy particulares en el país como sabanas de altura, páramos extensos con rasgos andinos, humedales tipo turberas denominados Sitios Ramsar y más de 30 lagos de origen glacial.\nEl ACLA-P goza de una diversidad cultural y exuberante belleza que merece los mejores esfuerzos de conservación y desarrollo sostenible de la mano con las comunidades locales, con el fin de garantizar el resguardo de sus tesoros naturales para las futuras generaciones.​"

  ngOnInit(): void {
  }

}
