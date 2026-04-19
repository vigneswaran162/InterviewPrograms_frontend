import { Component, OnInit } from '@angular/core';
import { ProgramMAsterService } from '../service/program-master.service';

@Component({
  selector: 'app-program-lists',
  imports: [],
  templateUrl: './program-lists.component.html',
  styleUrl: './program-lists.component.css'
})
export class ProgramListsComponent implements OnInit {

DataSource:any;

  constructor(private service: ProgramMAsterService) { }

  ngOnInit(): void {
   this.GetAllPRograms();
  }

  GetAllPRograms() {
    this.service.getAll().subscribe(res => {
      console.log('Programs', res);
      this.DataSource = Array.isArray(res?.data) ? res.data : [];
    });

  }

 
}
