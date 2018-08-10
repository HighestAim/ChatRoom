import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMessagesComponent } from './popup-messages.component';

describe('PopupMessagesComponent', () => {
  let component: PopupMessagesComponent;
  let fixture: ComponentFixture<PopupMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
