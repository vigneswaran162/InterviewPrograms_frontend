import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramListsComponent } from './program-lists.component';

describe('ProgramListsComponent', () => {
  let component: ProgramListsComponent;
  let fixture: ComponentFixture<ProgramListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
