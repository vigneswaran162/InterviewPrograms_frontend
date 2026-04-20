import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramMAsterService } from '../service/program-master.service';
import { ProgramMasterModel } from '../Model/ProgramMasterModel'
  ; import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-program-master',
  imports: [FormsModule, CKEditorModule, NgIf],
  templateUrl: './program-master.component.html',
  styleUrl: './program-master.component.css'
})
export class ProgramMasterComponent implements OnInit {

  model: ProgramMasterModel
  public Editor: any = null;
  isEditorReady = false;

  constructor(
    private service: ProgramMAsterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  async ngOnInit() {
    this.model = new ProgramMasterModel();
    if (isPlatformBrowser(this.platformId)) {
      const editorModule = await import('@ckeditor/ckeditor5-build-classic');
      this.Editor = editorModule.default;
      this.isEditorReady = true;
    }
  }

  preparemodel() {
    const mod = new ProgramMasterModel();
    mod.Title = this.model.Title;
    mod.Input = this.model.Input;
    mod.Output = this.model.Output;
    mod.Program = this.model.Program;
    mod.Category = this.model.Category;
    mod.SubCategory = this.model.SubCategory;
    mod.Void = 'N';
    mod.Notes = this.model.Notes;
    return mod
  }

  submitForm() {
    const data = this.preparemodel();
    if (!this.formvalidation()) {
      return;
    }
    this.service.insert(data).subscribe(res => {
      console.log('Inserted', res);
      alert('saved')
    });
  }

formvalidation() {

  if (!this.model.Category) {
    this.showToast('Category is required');
    return false;
  }

  if (!this.model.SubCategory) {
    this.showToast('Sub Category is required');
    return false;
  }

  if (!this.model.Title) {
    this.showToast('Title is required');
    return false;
  }

  if (!this.model.Program) {
    this.showToast('Program is required');
    return false;
  }

  return true;
}


  toastMessage: string = '';

showToast(message: string) {
  this.toastMessage = message;

  const toastElement = document.getElementById('validationToast');
  if (toastElement) {
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }
}
}
