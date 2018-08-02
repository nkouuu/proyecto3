import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecoComponent } from './new-reco.component';

describe('NewRecoComponent', () => {
  let component: NewRecoComponent;
  let fixture: ComponentFixture<NewRecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
