import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPostsComponent } from './class-posts.component';

describe('ClassPostsComponent', () => {
  let component: ClassPostsComponent;
  let fixture: ComponentFixture<ClassPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
