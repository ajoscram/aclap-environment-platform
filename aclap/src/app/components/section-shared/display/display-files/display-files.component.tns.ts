import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File, Module } from '../../../../models';
import { Controller } from '../../../../services/control/Controller.service';
import { getFile } from '@nativescript/core/http';
import * as fs from '@nativescript/core/file-system';
import * as dialogs from '@nativescript/core/ui/dialogs';

@Component({
  selector: 'app-display-files',
  templateUrl: './display-files.component.html',
  styleUrls: ['./display-files.component.scss']
})
export class DisplayFilesComponent implements OnInit {

  module: Module;
  files: File[];
  id: string;
  fileProgress: number;
  

  constructor(private route:ActivatedRoute, private controller: Controller) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));

    this.controller.getFiles(this.id)
    .then(files => { this.files = <File[]> files}) 
    .catch(error => console.error(error));
  }

  startDownload(fileURL: string, fileName: string): void {
    const permissions = require('nativescript-permissions')
    permissions.requestPermission("android.permission.WRITE_EXTERNAL_STORAGE")
    .then(() => {
        console.log('Required Android permissions have been granted');
    })
    .catch(() => {
        console.error('Required Android permissions have been denied!');
    });

    console.log('Download Started');
    var file = fs.path.join('/sdcard/download/', fileName);
    var url = fileURL
    getFile(url, file).then(function (r) {
      console.log(r.path);
      dialogs.alert({
          title: "Descargando",
          message: "El archivo se esta descargando y será guardado en el folder de descargas.",
          okButtonText: "Ok"
      })
    }, function (e) {
      //// Argument (e) is Error!
    });

  }

  
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  isPdf(filename): boolean {
    return filename.substring(filename.lastIndexOf('.')) === ".pdf";
  }

  isPpt(filename): boolean {
    return filename.substring(filename.lastIndexOf('.')) === ".ppt";
  }

  isDoc(filename): boolean {
    return filename.substring(filename.lastIndexOf('.')) === ".doc";
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

}
