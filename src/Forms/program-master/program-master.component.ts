import { Component,Inject,OnInit, PLATFORM_ID  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramMAsterService } from '../service/program-master.service';
import { ProgramMasterModel } from '../Model/ProgramMasterModel'
;import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-program-master',
  imports: [FormsModule,CKEditorModule,NgIf],
  templateUrl: './program-master.component.html',
  styleUrl: './program-master.component.css'
})
export class ProgramMasterComponent implements OnInit{

  model:ProgramMasterModel
  public Editor: any = null;
  isEditorReady = false;

  constructor(
    private service: ProgramMAsterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    this.model = new  ProgramMasterModel();
    if (isPlatformBrowser(this.platformId)) {
      const editorModule = await import('@ckeditor/ckeditor5-build-classic');
      this.Editor = editorModule.default;
      this.isEditorReady = true;
    }
  }

  preparemodel(){
    const mod = new ProgramMasterModel();
    mod.Title = this.model.Title;
    mod.Input = this.model.Input;
    mod.Output = this.model.Output;
    mod.Program = this.model.Program;
    return mod
  }

  add() {
  const data = this.preparemodel();
  if(!this.formvalidation()){
    return;
  }
  this.service.insert(data).subscribe(res => {
    console.log('Inserted', res);
    alert('saved')
  });
}

 formvalidation(){
  if(this.model.Title == "" || this.model.Title ==  null || this.model.Title == undefined){
    return false
  }
  //  if(this.model.Input == "" || this.model.Input ==  null || this.model.Input == undefined){
  //   return false
  // }
  //  if(this.model.Output == "" || this.model.Output ==  null || this.model.Output == undefined){
  //   return false
  // }
   if(this.model.Program == "" || this.model.Program ==  null || this.model.Program == undefined){
    return false
  }
  return true
 }

}
