import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  initial_message = "El Programa de Educación Ambiental del Área de Conservación La Amistad Pacífico (ACLA-P), es un esfuerzo colectivo de la institución, sus funcionarios y funcionarias, en conjunto con organizaciones de base comunal, sector científico, y personas líderes comunales. Los aportes de cada una de estas personas han forjado los cimientos de esta plataforma, que ahora toma ventaja de las tecnologías de la información y los principios del libre acceso, para compartir las herramientas educativas que tenemos a disposición. Además, invitamos a los y las usuarias, a compartir con nosotros sus logros al implementar las actividades de educación ambiental en el ACLA-P. Esta plataforma es una ventana para que todas las personas que sienten el anhelo por contribuir a una cultura ambiental, puedan hacerlo desde los procesos educativos, ya sea en sus núcleos familiares, su comunidad o incluso a nivel organizacional y regional. Los procesos de educación ambiental pueden tomar formas muy variadas, desde acciones concretas en los hogares, actividades en centros educativos, hasta festivales y celebraciones cantonales o nacionales. Todos y cada uno de estos aportes suman hacia el desarrollo sostenible global. Explora los módulos educativos que tenemos para compartir, celebra las efemérides ambientales más queridas en nuestra institución, y cuéntanos como utilizas estas herramientas para el bien de todos los seres vivos de este planeta.";

  ngOnInit(): void {
  }
}
