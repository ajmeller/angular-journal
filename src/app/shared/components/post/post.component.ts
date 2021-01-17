import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = { title: '', thought: '' };
  @Output() edited = new EventEmitter<Post>();
  @Output() deleted = new EventEmitter<Post>();

  editPost() {
    this.edited.emit(this.post);
  }

  deletePost() {
    this.deleted.emit(this.post);
  }

  constructor() {}

  ngOnInit(): void {}
}
