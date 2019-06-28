import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInvUserStatusComponent } from './chat-inv-user-status.component';

describe('ChatInvUserStatusComponent', () => {
  let component: ChatInvUserStatusComponent;
  let fixture: ComponentFixture<ChatInvUserStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInvUserStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInvUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
