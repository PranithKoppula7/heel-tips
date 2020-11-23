import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedTipsComponent } from './bookmarked-tips.component';

describe('BookmarkedTipsComponent', () => {
  let component: BookmarkedTipsComponent;
  let fixture: ComponentFixture<BookmarkedTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkedTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
