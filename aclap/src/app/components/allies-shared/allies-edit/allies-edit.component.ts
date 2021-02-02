import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ally, AllySection, Section } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-allies-edit',
  templateUrl: './allies-edit.component.html',
  styleUrls: ['./allies-edit.component.scss']
})
export class AlliesEditComponent implements OnInit {

  allies: Ally[] = [];
  allySections: AllySection[] = [];
  deletedSections: AllySection[] = [];
  isAdmin: boolean = false;
  sectionOptions: string[] = ["Aliado"];
  bg_img: string = "https://i.imgur.com/cXS4iWl.jpeg";
  text: string = "La consolidación de alianzas estratégicas es un importante objetivo del desarrollo sostenible. Nuestros aliados son todas las personas o entidades que contribuyen a una cultura ambiental en sus núcleos familiares, su comunidad, a nivel organizacional, institucional, regional o nacional. Estos son algunos de los aliados del Programa de Educación Ambiental del ACLA-P.";
  public sectionButtonsCollapsed = true;

  constructor(private controller: Controller, private router: Router) { 
  }

  async ngOnInit(): Promise<void> {
    this.controller.getAllies()
      .then( (allies: Ally[]) =>{
        this.allies = allies;
        console.log(this.allySections);
        this.allies.map( 
          (ally: Ally, i: number) => { 
            this.allySections.push( new AllySection(null, i, ally) ); 
          });
      })
      .catch();
      
    this.controller.getSession()
      .then(
        session => {
          if(session.role === Role.ADMINISTRATOR){
            this.isAdmin = true;
          }else {
            this.router.navigateByUrl('/inicio');
          }
        }
      )
      .catch(_ => {
        this.router.navigateByUrl('/inicio');
      });
  }

  deleteAlly(id: string){
    this.controller.deleteAlly(id)
      .then()
      .catch( error => {});
  }

  addSection(index: number){
    let newSection: Section;
    switch (index) {
      case 0: //Ally
        newSection = new AllySection(null,this.allySections.length,new Ally(null,"","",""));
        break;
      default:
        break;
    }
    this.allySections.push(<AllySection> newSection);
  }

  confirmChanges(){
    this.allySections.map( async (ally: AllySection) => {
      if( ally.ally.id == null){
        await this.controller.addAlly(ally.ally)
          .then()
          .catch()
      }else{ 
        /* EDIT ALLY */
      }
    });

    this.deletedSections.map(
      async (ally: AllySection) => {
        await this.controller.deleteAlly(ally.ally.id)
          .then()
          .catch();
      }
    );

    this.router.navigateByUrl('/aliados');

  }

  discardChanges(){
    this.router.navigateByUrl('/aliados');
  }

  

}
