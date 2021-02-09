import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ControlModule from '@src/app/modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})

export class GeoApiService{

    constructor(private http: HttpClient){}

    getReverseGeocoding(latitude: any, longitude: any){
        return this.http.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`);
    }

}
