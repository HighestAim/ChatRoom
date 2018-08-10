import { TestBed, inject } from '@angular/core/testing';

import { ChatMessagesService } from './chat-messages.service';

describe('ChatMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatMessagesService]
    });
  });

  it('should be created', inject([ChatMessagesService], (service: ChatMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
