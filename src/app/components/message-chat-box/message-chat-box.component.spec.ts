import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChatBoxComponent } from './message-chat-box.component';

describe('MessageChatBoxComponent', () => {
  let component: MessageChatBoxComponent;
  let fixture: ComponentFixture<MessageChatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageChatBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
