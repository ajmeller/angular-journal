import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../models/post.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    thought: new FormControl(''),
  });

  addEdit: string = 'Add';

  submitPost() {
    if (this.data.title != '' && this.data.thought != '') {
      this.dialogRef.close(this.data);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.title === '' && this.data.thought === '') {
      this.addEdit = 'Add';
    } else {
      this.addEdit = 'Edit';
    }

    this.postForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      thought: [this.data.thought, [Validators.required]],
    });

    this.postForm.valueChanges.subscribe((formUpdates) => {
      this.data = formUpdates;
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get thought() {
    return this.postForm.get('thought');
  }
}
