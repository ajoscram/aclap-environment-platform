import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@src/app/services/authentication/Session.model';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { EducatorRequest, EducatorRequestState, Event, Module, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tabTags = ["Módulos","Eventos","Solicitud de Persona Educadora"];
  tabEducator = ["Borrador de implementaciones", "Implementaciones finalizadas"];
  tabIndex = 1;
  user: User;
  events: Event[];
  modules: Module[];
  pendingRequests: EducatorRequest[];
  approvedRequests: EducatorRequest[];
  deniedRequests: EducatorRequest[];
  isAdmin: Boolean = false;
  isEducator: Boolean = false;
  len = 2;

  constructor(private controller: Controller, private router: Router,private translator: ErrorTranslator) { }

  async ngOnInit(): Promise<void> {
    this.pendingRequests = new Array();
    this.approvedRequests = new Array();
    this.approvedRequests = new Array();


    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    )
    .catch(_ => {
      this.router.navigateByUrl("/inicio");
    });

    this.controller.getModules().then(
      modules => {this.modules = modules}
    )
    .catch( err => { alert(this.translator.translate(err)); });

    this.controller.getEvents().then(
      events => {this.events = events}
    )
    .catch( err => { alert(this.translator.translate(err)); });
    
    let role: Role;
    try{
      role = await this.controller.getSession()
      .then( session => {
        if(session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
          this.len = 3;
        }else if(session.role === Role.EDUCATOR){
          this.isEducator = true;
        }
        return session.role;
      });
    }catch(error){
      this.router.navigateByUrl("/inicio");
    }

    if (role == Role.ADMINISTRATOR){
      this.controller.getEducatorRequests().then(
        (requests) => {
          requests.map(req => {
            if(req.state == EducatorRequestState.APPROVED){
              this.approvedRequests.push(req);
            }else if(req.state == EducatorRequestState.PENDING){
              this.pendingRequests.push(req);
            }else if(req.state == EducatorRequestState.DENIED){
              this.deniedRequests.push(req);
            }
          });
        }
      )
      .catch( err => { alert(this.translator.translate(err)); });
    }else if (role == Role.EDUCATOR){

    }

  }

  onAcceptResquest(index: number) {
    //index: number that indicates the position in the requests array
    this.controller.approveEducatorRequest(this.pendingRequests[index].id)
      .then((response: EducatorRequest) => {
        if(response.state == EducatorRequestState.APPROVED){
          alert(`Solicitud de ${response.name} ${response.lastname} : ${response.email} Aceptada`);
          this.pendingRequests.splice(index, 1);
        }
      })
      .catch( err => { alert(this.translator.translate(err)); });

  }

  onDeclineRequest(index: number) {
    this.controller.denyEducatorRequest(this.pendingRequests[index].id)
      .then((response: EducatorRequest) => {
        if(response.state == EducatorRequestState.DENIED){
          alert(`Solicitud de ${response.name} ${response.lastname} : ${response.email} Rechazada`);
          this.pendingRequests.splice(index, 1);
        }
      })
      .catch( err => { alert(this.translator.translate(err)); });

  }
}
