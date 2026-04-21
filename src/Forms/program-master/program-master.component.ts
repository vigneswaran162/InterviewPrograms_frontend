import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramMAsterService } from '../service/program-master.service';
import { ProgramMasterModel } from '../Model/ProgramMasterModel'
  ; import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-program-master',
  imports: [FormsModule, CKEditorModule, NgIf, NgFor],
  templateUrl: './program-master.component.html',
  styleUrl: './program-master.component.css'
})
export class ProgramMasterComponent implements OnInit {

  model: ProgramMasterModel
  public Editor: any = null;
  isEditorReady = false;
  isLoading: boolean = false;
  DataSource: any;
  isScreenChange: boolean = false;
  isupdate: boolean = false;

  filteredData: any[] = [];
  paginatedData: any[] = [];

  searchText = '';

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];


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
    mod._id = this.model._id;
    return mod
  }

  resetForm() {
    this.model = new ProgramMasterModel();
    this.isupdate = false;
  }

  submitForm() {
    const data = this.preparemodel();
    if (!this.formvalidation()) {
      return;
    }
    if (this.isupdate) {
      this.service.update(this.model._id, data).subscribe(res => {
        console.log('Inserted', res);
        this.showSuccessToast('Program Updated Successfully');
      });
    } else {
      this.service.insert(data).subscribe(res => {
        console.log('Inserted', res);
        this.showSuccessToast('Program Added Successfully');
      });
    }

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

  showSuccessToast(message: string) {
    this.toastMessage = message;

    const toastElement = document.getElementById('validationSuccessToast');
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }

  GetAllPRograms() {
    this.isLoading = true;
    this.service.getAll().subscribe(res => {

      this.DataSource = Array.isArray(res?.data) ? res.data : [];
      this.isLoading = false;
      this.filteredData = this.DataSource;
      this.updatePagination();
    });
    this.isLoading = false;
  }


  onClickList() {
    this.isScreenChange = !this.isScreenChange;
    if (this.isScreenChange) {
      this.GetAllPRograms();
    }
  }

  onEdit(item: any) {
    this.service.getById(item._id).subscribe(res => {
      this.model = res?.data ? res.data : new ProgramMasterModel();
      this.isupdate = true;
      this.isScreenChange = false;
    });
  }
  onDelete(item: any) {
    this.isLoading = true;
    this.service.delete(item._id).subscribe(res => {
      this.isLoading = false;
      this.showSuccessToast('Program Deleted Successfully');
      this.GetAllPRograms();
      this.isLoading = false;
    });
    this.isLoading = false;
  }


  applyFilter() {

    this.filteredData = this.DataSource.filter((x: any) =>
      x.Category.toLowerCase().includes(this.searchText.toLowerCase()) ||
      x.SubCategory.toLowerCase().includes(this.searchText.toLowerCase()) ||
      x.Title.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.currentPage = 1;
    this.updatePagination();

  }

  updatePagination() {

    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);

    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedData = this.filteredData.slice(start, end);

  }

  changePage(page: number) {

    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePagination();

  }


}
