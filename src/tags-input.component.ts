import {Component, forwardRef, EventEmitter, Output, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AlertController, ToastController} from "ionic-angular";
import {noop} from "@angular/core/src/linker/view_utils";
import * as _ from "lodash";
/*
  Generated class for the TagInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'tags-input',
  templateUrl: 'tags-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsInputComponent),
    multi: true
  }],
})
export class TagsInputComponent implements ControlValueAccessor {

  @Output() onTagAdded:EventEmitter<any> = new EventEmitter<any>();
  @Output() onTagRemoved:EventEmitter<any> = new EventEmitter<any>();
  @Input() maxTags: number;
  @Input() placeholder: string;
  @Input() maxWordLength: number;
  @Input() allowDuplicates: boolean = true;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public values: Array<any> = [];
  public isDisabled: boolean = false;

  constructor(private alertCtrl:AlertController, private toastCtrl:ToastController) {}

  writeValue(value: Array<any>): void {
    this.values = value || [];
    this.values.forEach((currentValue, index) => {
      currentValue.index = index;
    });
  }

  registerOnChange(fn: (_: Array<any>) => void): void {
    this.onChangeCallback = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) : void {
    this.isDisabled = isDisabled;
  }

  public addItem(): void {
    this.alertCtrl.create({
      title: 'Add item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Type text'
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data: any) => {
            data.index = this.values.length;
            if (data.name && !this.checkDuplicatesRestriction(data.name) && !this.checkMaxWordLengthRestriction(data.name)) {
                this.addValue(data);
                return true
            }
            return false
          }
        }
        ]
    }).present();
  }

  private checkMaxItemsRestriction (index: number): boolean {
    if (index >= this.maxTags) {
      this.setDisabledState(true);
      return true
    } else {
      this.setDisabledState(false);
      return false
    }
  }

  private addValue (data: any) {
    this.values.push({name: data.name, index: data.index});
    this.onTagAdded.emit(data);
    this.checkMaxItemsRestriction(data.index+1)
  }

  private checkDuplicatesRestriction(name: string): boolean {
    let duplicatesRestrictionError = this.toastCtrl.create({
      message: 'Error: Duplicates are not allowed',
      duration: 3000
    });

    if (!this.allowDuplicates) {
      if (_.find(this.values, {name})) {
        duplicatesRestrictionError.present();
        return true
      }
    }
    return false
  }

  private checkMaxWordLengthRestriction(name: string): boolean {
    let maxWordLengthRestrictionError = this.toastCtrl.create({
      message: 'Error: This word is too long',
      duration: 3000
    });

    if (name.length > this.maxWordLength) {
      maxWordLengthRestrictionError.present();
      return true
    }
    return false
  }

  public removeItem(index: number): void{
    this.onTagRemoved.emit(this.values[index]);
    this.values.splice(index, 1);
    this.checkMaxItemsRestriction(index)
  }

}
