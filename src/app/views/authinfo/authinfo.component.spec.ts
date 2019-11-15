import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthinfoComponent } from './authinfo.component';

describe('AuthinfoComponent', () => {
  let component: AuthinfoComponent;
  let fixture: ComponentFixture<AuthinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
