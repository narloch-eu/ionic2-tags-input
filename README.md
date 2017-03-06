# Ionic2 Tags Input
**Ionic 2** Module that allows to write the content in popular tags form.

## Features
- Custom labels and placeholders
- Max word's length restriction
- Max item's amount restriction
- Prevent duplicates restriction
- Callback fn after added or removed tag


![Gif](https://github.com/sub5111/ionic2-tags-input/blob/master/tags-input-example.gif?raw=true)

## Installation

#### 1. Install the NPM Package
```
npm install --save ionic2-tags-input
```

#### 2. Import `TagsInputModule` module into your app's module.

```typescript
import { TagsInputModule } from 'ionic2-tags-input';

// import the module
@NgModule({
  ...
  imports: [
    TagsInputModule
  ]
})
```

## Usage

Bind component to formControl or ngModel
```html
<tags-input formControlName="animals"></tags-input>
```

Form structure
```typescript
  public animals:FormGroup =  this.formBuilder.group({
    animals: [
        [
            {
                'name': 'Gazelle'
            },
            {
                'name': 'Cat'
            }
        ]
    ],
  });
```


### @Inputs / Attributes

| Name | Type | Description | Default Value |
| --- | --- | --- | --- |
| maxTags | number | Number of tags allowed. If maximum value is achieved, add button becomes disabled | N/A |
| maxWordLength | number | Maximum length of the word/sentence | N/A |
| allowDuplicates | boolean | Allow duplicates | false |
| buttonLabel | string | Add button label | Add |
| alertTitleLabel | string | The title of alert | Add item |
| alertInputPlaceholder | string | Placeholder of the input inside the alert modal | Type text |
| alertButtonLabel | string | Label of the alert button | OK |
| wordLengthRestrictionMsg | string | Text displayed if word is too long | Error: This word is too long |
| duplicatesRestrictionMsg | string | Text displayed if user is trying to make a duplicate | Error: Duplicates are not allowed |

### @Outputs

| Attribute Name | Type | Description |
| --- | --- | --- | --- |
| onTagAdded | fn | Callback fn after added tag
| onTagRemoved | fn | Callback fn after removed tag
