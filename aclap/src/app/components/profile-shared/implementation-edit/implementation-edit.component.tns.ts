import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../../services/control/Controller.service';
import { Implementation, Answer, Question, Module, User, IImplementation, Score} from '../../../models';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { ListPicker } from '@nativescript/core/ui';
import { openFilePicker } from 'nativescript-simple-filepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as dialogs from '@nativescript/core/ui/dialogs';
import * as geocoding from "nativescript-geocoding";
import { Location } from '../../../models';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-implementation-edit',
  templateUrl: './implementation-edit.component.html',
  styleUrls: ['./implementation-edit.component.scss']
})
export class ImplementationEditComponent implements OnInit {

  pickerDate: Date = new Date();
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
  scoreOptions: Score[] = [Score.UNKNOWN, Score.VERY_LOW, Score.LOW, Score.AVERAGE, Score.HIGH, Score.VERY_HIGH];
  imageUrls: string[] = ["res://score_unknown", "res://score_1", "res://score_2", "res://score_3", "res://score_4", "res://score_5"]
  indexMapper: Map<Score, number>;

  id: string;
  user: User;
  implementation: Implementation;

  constructor(private route:ActivatedRoute, private routerExtensions: RouterExtensions, private controller: Controller, private translator: ErrorTranslator) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.indexMapper = new Map();
    this.indexMapper.set(Score.UNKNOWN, 0);
    this.indexMapper.set(Score.VERY_LOW, 1);
    this.indexMapper.set(Score.LOW, 2);
    this.indexMapper.set(Score.AVERAGE, 3);
    this.indexMapper.set(Score.HIGH, 4);
    this.indexMapper.set(Score.VERY_HIGH, 5);

  }

  async ngOnInit() {
    try {
        this.user = await this.controller.getUser();
        this.implementation = await this.controller.getImplementation(this.id);
        this.questions = await this.controller.getQuestions(this.implementation.implementableId);
        this.answers = await this.controller.getAnswers(this.id);
        this.files = await this.controller.getEvidence(this.id);

        this.txtAddress = this.implementation.location.name.replace(", Costa Rica", "")
        this.pickerFparticipants = this.implementation.femaleParticipants;
        this.pickerMparticipants = this.implementation.maleParticipants;
        this.pickerOparticipants = this.implementation.otherParticipants;

        let sortedAnswers = []

        for (let q of this.questions) {
          let ops = ["Sin responder", q.options.get(Score.VERY_LOW), q.options.get(Score.LOW), q.options.get(Score.AVERAGE), q.options.get(Score.HIGH), q.options.get(Score.VERY_HIGH)];
          this.questionOptions.push(ops);
          let answer = this.getAnswer(q.id);
          sortedAnswers.push(answer);
          let scoreIndex = this.indexMapper.get(answer.score);
          this.imageOptions.push(this.imageUrls[scoreIndex]);
        }

        this.answers = sortedAnswers;

    } catch (error) {
      dialogs.alert({
        title: "Error!",
        message: this.translator.translate(error),
        okButtonText: "Ok"
      })
      this.routerExtensions.navigate(['perfil'], { clearHistory: true });
    }

  }

  getOptionIndex(answer): number {
    return this.indexMapper.get(answer.score);
  }

  getAnswer(questionId): Answer {
    return this.answers.find( answer => answer.questionId === questionId);
  }

  getFilename(filePath) {
    return filePath.split('\\').pop().split('/').pop();
  }

  onSelectedIndexChanged(args, i) {
    const picker = <ListPicker>args.object;
    switch(this.scoreOptions[picker.selectedIndex]) {
      case Score.VERY_LOW: {
        this.imageOptions[i] = "res://score_1";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex];
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break;
      }
      case Score.LOW: {
        this.imageOptions[i] = "res://score_2";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex];
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break;
      }
      case Score.AVERAGE: {
        this.imageOptions[i] = "res://score_3";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex];
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break;
      }
      case Score.HIGH: {
        this.imageOptions[i] = "res://score_4";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex];
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break;
      }
      case Score.VERY_HIGH: {
        this.imageOptions[i] = "res://score_5";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex];
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break;
      }
      default: {
        this.imageOptions[i] = "res://score_unknown";
        this.answers[i].score = this.scoreOptions[picker.selectedIndex];
        this.answers[i].option = this.questionOptions[i][picker.selectedIndex];
        break;
      }
    }
  }

  findFile() {
    openFilePicker({
        multipleSelection: true
    }).then((res) => {
        res.files.forEach(file => this.filePaths.push(file));
        res.files.forEach(file => this.fileNames.push(this.getFilename(file)));
    })
  }

  removeFile(index) {
    this.filePaths.splice(index, 1)
    this.fileNames.splice(index, 1)
  }

  removeOldFile(index) {
    this.controller.deleteEvidence(this.id, this.files[index].id);
    this.files.splice(index, 1);
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
      let locName = this.txtAddress + ", Costa Rica";
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
        implementableId: this.implementation.implementableId,
        implementableName: this.implementation.implementableName
      };

      await this.controller.updateImplementation(this.implementation.id, request);

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
            title: "Implementación finalizada",
            message: "Se finalizó la implementación correctamente.",
            okButtonText: "Ok"
          })
        })
      }else{
        dialogs.alert({
          title: "Implementación guardada",
          message: "Cambios guardados existosa",
          okButtonText: "Ok"
        })
      }

      this.routerExtensions.navigate(['perfil'], { clearHistory: true });

    } catch (error) {
      const err = <Error> error
      if(err.message === "Android Geocoder error : No locations found"){
        dialogs.alert({
          title: "Error!",
          message: "La ubicación insertada es invalida, revise que el formato sea el correcto.",
          okButtonText: "Ok"
        })
      }else{
        dialogs.alert({
          title: "Error!",
          message: this.translator.translate(error),
          okButtonText: "Ok"
        })
      }
    }

  }

  minDate: Date = new Date(2021, 0, 1);
  maxDate: Date = new Date(2050, 11, 31);
  todayDate: Date = new Date();
  participants: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

}
