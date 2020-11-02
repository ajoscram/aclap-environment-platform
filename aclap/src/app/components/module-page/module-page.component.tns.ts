import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section, Module, DisciplineMetadata, Subject, Discipline, TitleSection, ImageSection, ParagraphSection, ActivitySection, YoutubeVideoSection, TitleSectionSize } from '../../models';


@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  modules: Module[];
  module: Module;
  sections: Section[];
  id: string;

  constructor( private route:ActivatedRoute ) { 

    this.id = this.route.snapshot.paramMap.get('id');

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

    this.sections = [
      new TitleSection(''+11, 0, TitleSectionSize.H1, 'Título Grande'),
      new ImageSection(''+12, 1, 'Pie de foto', 'https://media.nationalgeographic.org/assets/photos/000/284/28446.jpg', 'Referencia'),
      new TitleSection(''+13, 2, TitleSectionSize.H2, 'Subtítulo'),
      new ParagraphSection(''+14, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
      new ActivitySection(''+15, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 30, 'Herramientas listadas acá',[]),
      new TitleSection(''+16, 5, TitleSectionSize.H2, 'Otro subtítulo'),
      new ParagraphSection(''+17, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
      new YoutubeVideoSection(''+18, 7, 'https://www.youtube.com/watch?v=XqZsoesa55w')
    ];
  }

  ngOnInit(): void {

    this.modules.forEach( element => {
      if(element.id == this.id){
        this.module = element
      }
    })
    
  }

}
