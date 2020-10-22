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
      requirements: new Array("Nada"),
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
    },
    {
      id: "2",
      name: "MI AGUA",
      publisherId: "5",
      publisherName: "Jorge Mario",
      publisherLastname: "Alvarez Barquero",
      recommendedAge: 45,
      objectives: new Array("Hola", "Cambiar", "Horas"),
      requirements: new Array("Nada"),
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
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
