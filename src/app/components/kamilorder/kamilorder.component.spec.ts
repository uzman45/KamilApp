import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KamilorderComponent } from './kamilorder.component';

describe('KamilorderComponent', () => {
  let component: KamilorderComponent;
  let fixture: ComponentFixture<KamilorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KamilorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KamilorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
