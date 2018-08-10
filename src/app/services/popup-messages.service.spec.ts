import { TestBed, inject } from '@angular/core/testing';

import { PopupMessagesService } from './popup-messages.service';

describe('PopupMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupMessagesService]
    });
  });

  it('should be created', inject([PopupMessagesService], (service: PopupMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
