import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books;
  user_id ;


  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,private formBuilder: FormBuilder) {
      
  }

  ngOnInit() {

      this.user_id = this.route.snapshot.params['id'];
    this.getBooks();



  }
    getBooks() {
    this.api.getBooks()
      .subscribe(data => {
        console.log(data);
		this.books = data;
		for (let i = 0; i < this.books.length; i++) {
          this.api.getUserBook(this.user_id , this.books[i].BookID)
              .subscribe(res => {
                if (res.length > 0) {
                  console.log('ressss')
                  console.log(res)
                    this.books[i].isEnrolled = true;
                } else {
                  this.books[i].isEnrolled = false;
                }
                this.books[i].index = i;
                  }, (err) => {
                    console.log(err);
                  }
              );
        }
      });
  }
  getEnrolled(id: string , ind: string)
  {
    let userBook: object = {};
    userBook['uid'] = this.user_id;
    userBook['bid'] = id;
    this.api.postUserBook(userBook)
        .subscribe(res => {
          this.books[ind].availability = this.books[ind].availability - 1;
          this.api.updateBook(this.books[ind]._id, this.books[ind])
              .subscribe(res1 => {
                this.books[ind].isEnrolled = true;
              }, (err) => {
                console.log(err);
              });
          this.books[ind].isEnrolled = true;
        }, (err) => {
          console.log(err);
        });
  }

}
