import { Component, OnInit } from '@angular/core';
import { ProgramMAsterService } from '../service/program-master.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-program-lists',
  imports: [NgIf],
  templateUrl: './program-lists.component.html',
  styleUrl: './program-lists.component.css'
})
export class ProgramListsComponent implements OnInit {

  DataSource: any;
  isLoading: boolean = false;

  constructor(private service: ProgramMAsterService) { }

  ngOnInit(): void {
    this.GetAllPRograms();
  }

  GetAllPRograms() {
    this.isLoading = true;
    this.service.getAll().subscribe(res => {
      this.isLoading = false;
      this.DataSource = Array.isArray(res?.data) ? res.data : [];
      this.isLoading = false;
    });
    this.isLoading = false;
  }


}
