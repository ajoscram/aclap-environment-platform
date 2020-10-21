import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-card-list',
  templateUrl: './module-card-list.component.html',
  styleUrls: ['./module-card-list.component.scss']
})
export class ModuleCardListComponent implements OnInit {

  cards = [
    {
      id: "1",
      name: "MI ENTORNO",
      publisherId: "5",
      publisherName: "Jorge Mario",
      publisherLastname: "Alvarez Barquero",
      recommendedAge: 45,
      objectives: new Array("Hola", "Cambiar", "Horas"),
      requirements: new Array("Nada")
    },
    {
      id: "2",
      name: "MI AGUA",
      publisherId: "5",
      publisherName: "Jorge Mario",
      publisherLastname: "Alvarez Barquero",
      recommendedAge: 45,
      objectives: new Array("Hola", "Cambiar", "Horas"),
      requirements: new Array("Nada")
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
