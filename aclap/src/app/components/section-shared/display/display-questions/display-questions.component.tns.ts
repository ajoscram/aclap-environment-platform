import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Controller } from '../../../../services/control/Controller.service';
import { Location, Implementation, Answer, Question, Module, User, IImplementation, Score } from '../../../../models';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { ListPicker } from '@nativescript/core/ui';
import { openFilePicker } from 'nativescript-simple-filepicker';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as dialogs from '@nativescript/core/ui/dialogs';
import * as geocoding from "nativescript-geocoding";

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.scss']
})
export class DisplayQuestionsComponent implements OnInit {

  pickerDate: Date;
  txtAddress: string;
  pickerFparticipants: number;
  pickerMparticipants: number;
  pickerOparticipants: number;

  questions: Question[] = [];
  answers: Answer[] = [];
  files: any[] = [];
  filePaths: string[] = [];
  fileNames: string[] = [];
  questionOptions: string[][] = [];
  imageOptions: string[] = [];
  scoreOptions: Score[] = [Score.VERY_LOW, Score.LOW, Score.AVERAGE, Score.HIGH, Score.VERY_HIGH];

  module: Module;
  id: string;
  user: User;
  implementation: Implementation;

  constructor(private route:ActivatedRoute, private builder: FormBuilder, private controller: Controller, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));

    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    );

    this.controller.getQuestions(this.id)
      .then(qstns => {
        this.questions = qstns; 
        qstns.map(q =>  {
          this.answers.push(new Answer(null, q.id, q.question, null, null))
          this.imageOptions.push("res://score_3")
          let ops = [q.options[Score.VERY_HIGH], q.options[Score.LOW], q.options[Score.AVERAGE], q.options[Score.HIGH], q.options[Score.VERY_HIGH]]
          this.questionOptions.push(ops)
        })
      })
      .catch( err => { console.log(this.translator.translate(err)); } );

  }

  getFilename(filePath) {
    return filePath.split('\\').pop().split('/').pop();
  }

  onSelectedIndexChanged(args, i) {
    const picker = <ListPicker>args.object;
    switch(this.scoreOptions[picker.selectedIndex]) { 
      case 'VERY_LOW': { 
        this.imageOptions[i] = "res://score_1";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex]; 
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break; 
      } 
      case 'LOW': { 
        this.imageOptions[i] = "res://score_2";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex]; 
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex]; 
        break; 
      }
      case 'AVERAGE': { 
        this.imageOptions[i] = "res://score_3";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex]; 
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break; 
      } 
      case 'HIGH': { 
        this.imageOptions[i] = "res://score_4";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex]; 
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex]; 
        break; 
      } 
      default: { 
        this.imageOptions[i] = "res://score_5";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex]; 
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex]; 
        break; 
      } 
    }
  }

  findFile(event) {
    openFilePicker({
        multipleSelection: true
    }).then((res) => {
        res.files.forEach(file => this.filePaths.push(file));
        res.files.forEach(file => this.fileNames.push(this.getFilename(file)));
    })
  }

  removeFile(event, index) {
    this.filePaths.splice(index, 1)
    this.fileNames.splice(index, 1)
  }

  isImg(filename): boolean {
    return filename.substring(filename.lastIndexOf('.')) === ".jpg" || filename.substring(filename.lastIndexOf('.')) === ".png";
  }

  isFile(filename): boolean {
    return filename.substring(filename.lastIndexOf('.')) !== ".jpg" 
    && filename.substring(filename.lastIndexOf('.')) !== ".png";
  }

  async onSubmit(submitType): Promise <void> {

    try {
      let locName = this.txtAddress + " Costa Rica";
      let loc = await geocoding.getLocationFromName(locName);

      const request: IImplementation = {
        date: this.pickerDate,
        femaleParticipants: this.pickerFparticipants,
        maleParticipants: this.pickerMparticipants,
        otherParticipants: this.pickerOparticipants,
        location: new Location(locName, loc.latitude, loc.longitude),
        educatorId: this.user.id,
        educatorName: this.user.name,
        educatorLastname: this.user.lastname,
        implementableId: this.module.id,
        implementableName: this.module.name
      };

      await this.controller.addImplementation(request)
      .then( impl => { this.implementation = impl });

      for (let filePath of this.filePaths){
        await this.controller.addEvidence(this.implementation.id, filePath);
      }

      for (let answer of this.answers){
        await this.controller.addAnswer(this.implementation.id, answer);
      }

      if(submitType === "complete"){
        await this.controller.completeImplementation(this.implementation.id)
        .then( non => {
          dialogs.alert({
            title: "Implementación enviada",
            message: "Se envio exitosamente la implementación",
            okButtonText: "Ok"
          })
        })
      }else{
        dialogs.alert({
          title: "Implementación guardada",
          message: "Se ha guardado exitosamente la implementación",
          okButtonText: "Ok"
        })
      }

    } catch (error) {
      console.log(error)
      dialogs.alert( this.translator.translate(error) )
    }

  }

  minDate: Date = new Date(2021, 0, 1);
  maxDate: Date = new Date(2050, 11, 31);
  todayDate: Date = new Date();
  participants: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

}
