import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsFromFileComponent } from './sms-from-file.component';

describe('SmsFromFileComponent', () => {
  let component: SmsFromFileComponent;
  let fixture: ComponentFixture<SmsFromFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsFromFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
