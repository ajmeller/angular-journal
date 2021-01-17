import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  addEdit: string = 'Add';

  submitPost() {
    if (this.data.title != '' && this.data.thought != '') {
      this.dialogRef.close(this.data);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) {}

  ngOnInit(): void {
    if (this.data.title === '' && this.data.thought === '') {
      this.addEdit = 'Add';
    } else {
      this.addEdit = 'Edit';
    }
  }
}
