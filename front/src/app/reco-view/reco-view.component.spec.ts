import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoViewComponent } from './reco-view.component';

describe('RecoViewComponent', () => {
  let component: RecoViewComponent;
  let fixture: ComponentFixture<RecoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
