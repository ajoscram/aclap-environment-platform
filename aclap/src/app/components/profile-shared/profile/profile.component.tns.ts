import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Implementation, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';
import { DatePipe } from '@angular/common';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { inputType } from '@nativescript/core';
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

  async changePassword() {
    try {

      const r1 = await dialogs.prompt({
        title: "Cambio de contraseña",
        message: "Digite la nueva contraseña que desea utilizar.",
        okButtonText: "Ok",
        cancelButtonText: "Cancelar",
        defaultText: "",
        inputType: inputType.password
      });

      if(r1.result) {
        if(await this.checkPasswords(r1.text)) {

          await this.controller.setPassword(r1.text);
          await dialogs.alert({
            title: "Confirmación",
            message: "¡Se cambió la contraseña exitosamente!",
            okButtonText: "Ok"
          });
        }else{
          await dialogs.alert({
            title: "Error",
            message: "¡Por favor digite la contraseña igual dos veces!",
            okButtonText: "Ok"
          });
        }
      }
    } catch (error) {
      await dialogs.alert({
        title: "Error",
        message: this.translator.translate(error),
        okButtonText: "Ok"
      });
    }
  }

  logout(): void{
    this.controller.logout();
    this.routerExtensions.navigate(['inicio'], { clearHistory: true });
  }

  async removeCompleteImpl(id, index) {
    dialogs.confirm({ title: "Confirmar", message: "¿Desea eliminar esta implementación?", okButtonText: "Ok", cancelButtonText: "Cancelar" })
    .then(async result => {
      if(result){
        try {
          await this.implementationsCompleted.splice(index, 1);
          await this.controller.deleteImplementation(id);
          dialogs.alert({ title: "Alerta", message: "Implementación borrada exitosamente", okButtonText: "Ok"});
        } catch (error) {
          dialogs.alert(this.translator.translate(error));
        }
      }
    });
  }

  async removeIncompleteImpl(id, index) {
    dialogs.confirm({ title: "Confirmar", message: "¿Desea eliminar esta implementación?", okButtonText: "Ok", cancelButtonText: "Cancelar" })
    .then(async result => {
      if(result){
        try {
          await this.implementationsIncomplete.splice(index, 1);
          await this.controller.deleteImplementation(id);
          dialogs.alert({ title: "Alerta", message: "Implementación borrada exitosamente", okButtonText: "Ok"});
        } catch (error) {
          dialogs.alert(this.translator.translate(error));
        }
      }
    });
  }

  completeDialog(): void {
    dialogs.alert({
      title: "Implementación completada",
      message: "Ya no es posible editar esta implementación.",
      okButtonText: "Ok"
    })
  }

  async checkPasswords(firstPassword): Promise<boolean> {
    const r2 = await dialogs.prompt({
      title: "Cambio de contraseña",
      message: "Digite la misma contraseña.",
      okButtonText: "Ok",
      cancelButtonText: "Cancelar",
      defaultText: "",
      inputType: inputType.password
    })
    return (r2.result && r2.text === firstPassword);
  }

  navigateToEditImplementation(id): void {
    this.routerExtensions.navigate(['/implEdit', id], { clearHistory: false });
  }

}
