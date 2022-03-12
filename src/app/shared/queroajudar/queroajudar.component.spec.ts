import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueroajudarComponent } from './queroajudar.component';

describe('QueroajudarComponent', () => {
  let component: QueroajudarComponent;
  let fixture: ComponentFixture<QueroajudarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueroajudarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueroajudarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
