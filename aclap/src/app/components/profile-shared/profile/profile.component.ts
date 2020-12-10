import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Role } from '@src/app/services/authentication/Session.model';
import { EducatorRequest, EducatorRequestState, Event, Module, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tabTags = ["Módulos","Eventos","Solicitud de Educador Ambiental"]
  tabIndex = 1
  user: User;
  events: Event[];
  modules: Module[];
  pendingRequests: EducatorRequest[];
  approvedRequests: EducatorRequest[];
  deniedRequests: EducatorRequest[];
  isAdmin: Boolean;
  len = 2;

  constructor(private controller: Controller) { }

  ngOnInit(): void {
    this.pendingRequests = new Array();
    this.approvedRequests = new Array();
    this.approvedRequests = new Array();


    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    )
    .catch();

    this.controller.getModules().then(
      modules => {this.modules = modules}
    );

    this.controller.getEvents().then(
      events => {this.events = events}
    ).
    catch();

    this.controller.getSession().then(
      session => {
        if(session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
          this.len = 3;
        }else{
          this.isAdmin = false;
        }
      }
    ).
    catch();

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
    .catch();
  }

  onAcceptResquest(index: number) {
    //index: number that indicates the position in the requests array
    this.controller.approveEducatorRequest(this.pendingRequests[index].id)
      .then((response: EducatorRequest) => {
        if(response.state == EducatorRequestState.APPROVED){
          alert(`Solicitud de ${response.name} ${response.lastname} : ${response.email} Aceptada`);
          this.pendingRequests.splice(index, 1);
        }
      }).
      catch(error => {
        return; 
      });

  }

  onDeclineRequest(index: number) {
    this.controller.denyEducatorRequest(this.pendingRequests[index].id)
      .then((response: EducatorRequest) => {
        if(response.state == EducatorRequestState.APPROVED){
          alert(`Solicitud de ${response.name} ${response.lastname} : ${response.email} Rechazada`);
          this.pendingRequests.splice(index, 1);
        }
      }).
      catch(error => {
        return; 
      });

  }
}
