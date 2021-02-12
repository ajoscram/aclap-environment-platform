import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ally, AllySection, Section } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

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

  constructor(private controller: Controller, private router: Router, private translator: ErrorTranslator) { 
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
      .catch( err => { alert(this.translator.translate(err)); } );
      
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
      .catch( err => {
        alert(this.translator.translate(err));
        this.router.navigateByUrl('/inicio');
      });
  }

  deleteAlly(id: string){
    this.controller.deleteAlly(id)
      .then()
      .catch( err => { alert(this.translator.translate(err)); });
  }

  addSection(index: number){
    let newSection: Section;
    switch (index) {
      case 0: //Ally
        newSection = new AllySection(null,this.allySections.length,new Ally("","","",""));
        break;
      default:
        break;
    }
    this.allySections.push(<AllySection> newSection);
  }

  confirmChanges(){
    this.allySections.map( async (ally: AllySection) => {
      if( ally.ally.id == null){
        console.log(ally);
        await this.controller.addAlly(ally.ally)
          .then()
          .catch( err => { alert(this.translator.translate(err)); });
      }else{ 
        await this.controller.updateAlly(ally.ally.id, ally.ally)
          .then()
          .catch( err => { alert(this.translator.translate(err)); });
      }
    });

    this.deletedSections.map(
      async (ally: AllySection) => {
        await this.controller.deleteAlly(ally.ally.id)
          .then()
          .catch( err => { alert(this.translator.translate(err)); });
      }
    );

    this.router.navigateByUrl('/aliados');

  }

  discardChanges(){
    this.router.navigateByUrl('/aliados');
  }

  

}
