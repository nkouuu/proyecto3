import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecoComponent } from './edit-reco.component';

describe('EditRecoComponent', () => {
  let component: EditRecoComponent;
  let fixture: ComponentFixture<EditRecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
