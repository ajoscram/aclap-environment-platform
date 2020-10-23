import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DisplayYoutubeComponent } from '@src/app/components/display/display-youtube/display-youtube.component';



@NgModule({
  declarations: [DisplayYoutubeComponent],
  imports: [
    CommonModule,
    YouTubePlayerModule
  ],
  exports: [DisplayYoutubeComponent]
})
export class VideoModule { }
