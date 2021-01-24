import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Controller } from '../../../../services/control/Controller.service';
import { Implementation, Answer, Question, Module, User} from '../../../../models';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { ListPicker } from '@nativescript/core/ui';
import { openFilePicker } from 'nativescript-simple-filepicker';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.scss']
})
export class DisplayQuestionsComponent implements OnInit {

  module: Module;
  implementation: Implementation;
  questions: Question[] = [];
  answers: Answer[] = [];
  files: any[] = [];
  filePaths: string[] = [];
  fileNames: string[] = [];

  imageOptions: string[] = [];

  id: string;
  user: User;

  constructor(private route:ActivatedRoute, private controller: Controller, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) {
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

    this.controller.draftImplementation(this.id)
      .then(impl => {this.implementation = <Implementation> impl})
      .catch( err => { console.log(this.translator.translate(err)); } );

    this.controller.addImplementation(this.implementation)
      .then(impl => {this.implementation = <Implementation> impl})
      .catch( err => { console.log(this.translator.translate(err)); } ); 

    this.controller.getQuestions(this.id)
      .then(qstns => {this.questions = qstns; qstns.map(q =>  {this.answers.push(new Answer(null,q.id, q.question, null, null))} )})
      .catch( err => { console.log(this.translator.translate(err)); } );
    
    for (let q of this.questions) {
      this.imageOptions.push("res://score_3")
    }

  }

  getFilename(filePath) {
    return filePath.split('\\').pop().split('/').pop();
  }

  onSelectedIndexChanged(args, i) {
    const picker = <ListPicker>args.object;
    switch(this.questionOptions[picker.selectedIndex]) { 
      case "Muy mal": { 
        this.imageOptions[i] = "res://score_1" 
        break; 
      } 
      case "Mal": { 
        this.imageOptions[i] = "res://score_2" 
        break; 
      }
      case "Regular": { 
        this.imageOptions[i] = "res://score_3" 
        break; 
      } 
      case "Bien": { 
        this.imageOptions[i] = "res://score_4" 
        break; 
      } 
      default: { 
        this.imageOptions[i] = "res://score_5" 
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
    && filename.substring(filename.lastIndexOf('.')) !== ".png"
    && filename.substring(filename.lastIndexOf('.')) !== ".doc"
    && filename.substring(filename.lastIndexOf('.')) !== ".ppt"
    && filename.substring(filename.lastIndexOf('.')) !== ".pdf";
  }

  minDate: Date = new Date(2021, 0, 1);
  maxDate: Date = new Date(2050, 11, 31);
  todayDate: Date = new Date();
  participants: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  questionOptions: Array<string> = ["Muy mal", "Mal", "Regular", "Bien", "Muy bien"]

}
