import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostFormComponent } from '../post-form/post-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'social-posts',
  templateUrl: './social-posts.component.html',
  styleUrls: ['./social-posts.component.css'],
})
export class SocialPostsComponent implements OnInit {
  posts: Post[] = [];

  addEdit: string = '';

  openPostForm(newPost: boolean, post?: Post, i?: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50%';
    dialogConfig.position = { top: '9%' };

    if (newPost) {
      dialogConfig.data = { title: '', thought: '' };
    } else {
      dialogConfig.data = post;
    }

    const dialogRef = this.dialog.open(PostFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data.title != '' && data.thought != '') {
        if (newPost) {
          this.posts.unshift(data);
        } else if (i) {
          this.posts[i].title = data.title;
          this.posts[i].thought = data.thought;
        }
      }
    });
  }

  onDelete = (i: number) => {
    this.posts.splice(i, 1);
  };

  onEdit = (post: Post, i: number) => {
    this.openPostForm(false, post, i);
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.posts = [
      { title: 'Beebo thoughts', thought: "I'm a cat." },
      { title: 'Howdy', thought: 'This is my post' },
      {
        title: 'New Post',
        thought:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ];
  }
}
