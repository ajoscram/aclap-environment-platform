import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Implementation, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';
import { DatePipe } from '@angular/common';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  implementationsCompleted: Implementation[] = [];
  implementationsIncomplete: Implementation[] = [];

  user: User;

  constructor(private controller: Controller, public datepipe: DatePipe, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) { }

  ngOnInit(): void {

    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    );

    this.controller.getImplementations(true).then(
      implentations => {this.implementationsCompleted = implentations}
    );

    this.controller.getImplementations(false).then(
      implentations => {this.implementationsIncomplete = implentations}
    );

  }

  formatDate(date: Date): string {
    return this.datepipe.transform(date, 'dd-MM-yyyy');
  }

  logout(): void{
    this.controller.logout();
    this.routerExtensions.navigate(['inicio'], { clearHistory: true });
  }

  removeCompleteImpl(id, index): void{
    dialogs.confirm({ title: "Confirmar", message: "Desea eliminar esta implementación?", okButtonText: "Ok", cancelButtonText: "Cancelar" })
    .then(result => {
      if(result){
        this.implementationsCompleted.splice(index, 1);
        this.controller.deleteImplementation(id)
        .catch( error => { dialogs.alert(this.translator.translate(error)); })
      }
    });
  }

  removeIncompleteImpl(id, index): void{
    dialogs.confirm({ title: "Confirmar", message: "Desea eliminar esta implementación?", okButtonText: "Ok", cancelButtonText: "Cancelar" })
    .then(result => {
      if(result){
        this.implementationsIncomplete.splice(index, 1);
        this.controller.deleteImplementation(id)
        .catch( error => { dialogs.alert(this.translator.translate(error)); })
      }
    });
  }

  completeDialog(): void {
    dialogs.alert({
      title: "Implementación completada",
      message: "Esta implementación ya esta completada e enviada por lo que no se puede editar",
      okButtonText: "Ok"
    })
  }

  navigateToEditImplementation(id): void {
    this.routerExtensions.navigate(['/implEdit', id], { clearHistory: false });
  }

}
