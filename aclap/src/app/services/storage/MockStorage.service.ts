import { Injectable } from '@angular/core';
import { IFile, File } from '@src/app/models';
import ControlModule from '../../modules/control/control.module';
import { Storage } from './Storage.service'

@Injectable({
    providedIn: ControlModule
})
export class MockStorage implements Storage{

    private static readonly LINKS: string[] = [
        "https://ak.picdn.net/shutterstock/videos/2028055/thumb/1.jpg",
        "https://static.scientificamerican.com/sciam/cache/file/4E0744CD-793A-4EF8-B550B54F7F2C4406_source.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg",
        "https://ticotimes.net/wp-content/uploads/2018/02/Conchal-DSC_3420-b.jpg",
        "https://www.govisitcostarica.com/images/photos/full-cloud-forest-monteverde.jpg",
        "https://i1.wp.com/www.anywhere.com/blog/wp-content/uploads/2018/08/cr-rainforest-tours-sloth.png",
        "https://gdphotography.com/blog/wp-content/uploads/2017/10/2011-july-costa-rica-gd-inline-01.jpg",
        "https://earth.org/wp-content/uploads/2020/07/800px-Great_white_shark_south_africa.jpg",
        "https://audubon.org/sites/default/files/styles/hero_image/public/Hummingbird_Hero_Roger_Levien.jpeg",
        "https://img.theculturetrip.com/wp-content/uploads/2018/02/orchid2.jpg"
    ];

    constructor(){}

    private getRandomLink(): string{
        return MockStorage.LINKS[Math.floor(Math.random()*MockStorage.LINKS.length)];
    }

    async upload(path: string): Promise<IFile>{
        const link: string = this.getRandomLink();
        const name: string = link.slice(link.lastIndexOf('/') + 1);
        return {
            url: link,
            name: name,
            uploaded: new Date(),
            bytes: Math.floor(Math.random()*1073741824) //a gigabyte maximum
        };
    }

    async delete(file: File): Promise<void>{ }
}