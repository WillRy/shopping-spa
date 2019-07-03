import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInvUserListComponent } from './chat-inv-user-list.component';

describe('ChatInvUserListComponent', () => {
  let component: ChatInvUserListComponent;
  let fixture: ComponentFixture<ChatInvUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInvUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInvUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
