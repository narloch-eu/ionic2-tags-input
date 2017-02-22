import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TagsInputComponent } from './tags-input.component';

@NgModule({
  imports: [IonicModule],
  declarations: [
    TagsInputComponent,
  ],
  exports: [ TagsInputComponent ],
  entryComponents: [ TagsInputComponent ],
})
export class TagsInputModule {}
