import { Component, OnInit } from '@angular/core';
import { Discipline, DisciplineMetadata, Subject } from '../../models';
import { Module } from '@src/app/models/implementables/Module.model';

@Component({
  selector: 'app-module-card-list',
  templateUrl: './module-card-list.component.html',
  styleUrls: ['./module-card-list.component.scss']
})
export class ModuleCardListComponent implements OnInit {

  modules: Module[];

  constructor(){

    let disciplineMetadata = new DisciplineMetadata(
      //subjects
      [ new Subject('Estudios Sociales', '#585FC2'), new Subject('Cívica', '#019CF6'), new Subject('Ciencias', '#53A23C')],
      //years
      ['1er Año', '2do Año', '3er Año', '4to Año','5to Año','6to Año','7mo Año']
  );

    this.modules = [
      new Module('asd123', 'MI ENTORNO', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, ['Hola', 'Cambiar', 'Horas'], ['Nada'], [
          new Discipline(disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
      ]),
      new Module('qwe123', 'MI AGUA', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, ['Hola', 'Cambiar', 'Horas'], ['Nada'], [
          new Discipline(disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
          new Discipline(disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
      ])
  ];

  }

  ngOnInit(): void {}
}
