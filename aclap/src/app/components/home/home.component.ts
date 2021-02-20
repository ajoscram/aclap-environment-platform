import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  bg_img = "https://i.imgur.com/aflQ43f.jpeg";
  credit = "Giancarlo Pucci / PNUD-Costa Rica";

  initial_message = "El Programa de Educación Ambiental del Área de Conservación La Amistad Pacífico (ACLA-P), es un esfuerzo colectivo de la institución, sus funcionarios y funcionarias, en conjunto con personas líderes comunales, organizaciones de base, sector científico y organismos internacionales. Los aportes de todos y todas se concretan en esta plataforma de herramientas de educación ambiental, con el fin de continuar compartiendo la responsabilidad por conservar los tesoros naturales de Costa Rica.\n\nExplora los módulos educativos que tenemos para compartir, celebra las efemérides ambientales más queridas de nuestra institución, y cuéntanos cómo utilizas estas herramientas para la construcción de una cultura ambiental.  Todos y cada uno de estos aportes suman hacia el desarrollo sostenible local y global.";

  ngOnInit(): void {
  }
}
