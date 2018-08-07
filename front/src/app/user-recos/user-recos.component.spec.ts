import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecosComponent } from './user-recos.component';

describe('UserRecosComponent', () => {
  let component: UserRecosComponent;
  let fixture: ComponentFixture<UserRecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRecosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
