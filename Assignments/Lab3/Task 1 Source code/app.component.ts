import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    let book: object = {};
    /*this.api.getBook('1')
        .subscribe(data => {
            console.log(data);
          if ( data.length === 0) {

            book['BookID'] = 1;
            book['name'] = 'Applications of Kubernetes';
            book['Professor'] = 'Edward Thomson';
            book['img'] = 'img';
            book['availability'] = '25';
            this.api.postBook(book)
                .subscribe(res => {

                  this.router.navigate(['/user-profile', res._id]);

                }, (err) => {
                  console.log(err);
                });
          }

        });
    this.api.getBook('2')
        .subscribe(data => {
          if ( data.length === 0) {

            book['BookID'] = 2;
            book['name'] = ' Introduction to Docker';
            book['Professor'] = 'John peteerson';
            book['img'] = 'img';
            book['availability'] = '25';
            this.api.postBook(book)
                .subscribe(res => {

                  this.router.navigate(['/user-profile', res._id]);

                }, (err) => {
                  console.log(err);
                });
          }

        });
    this.api.getBook('3')
        .subscribe(data => {
          if ( data.length === 0) {

            book['BookID'] = 3;
            book['name'] = 'Micro Service Acrhitecture';
            book['Professor'] = 'Scott vindale';
            book['img'] = 'img';
            book['availability'] = '25';
            this.api.postBook(book)
                .subscribe(res => {

                  this.router.navigate(['/user-profile', res._id]);

                }, (err) => {
                  console.log(err);
                });
          }

        });
      this.api.getBook('1')
          .subscribe(data => {
              console.log(data[0]._id);
          });
      this.api.getBook('2')
          .subscribe(data => {
              console.log(data[0]._id);
          });
      this.api.getBook('3')
          .subscribe(data => {
              console.log(data[0]._id);
          });
      this.api.getBook('4')
          .subscribe(data => {
              console.log(data[0]._id);
          });*/
      this.api.getBook('5')
          .subscribe(data => {
              console.log(data[0]._id);
          });
    //this.api.deleteBook('5caa7d6e5d57f10ed880fdba');
      this.api.deleteBook('5caa9e284a67763f2cf983ca');
    //  this.api.deleteBook('5caa7d6e5d57f10ed880fdb8');
    //  this.api.deleteBook('5caa7d6e5d57f10ed880fdb9');
    //  this.api.deleteBook('5caa7d6e5d57f10ed880fdbb');
console.log('before get ')
      this.api.getBook('5')
          .subscribe(data => {
              console.log(data);
          });

      // this.api.getBook('4')
    //     .subscribe(data => {
	// 		console.log("*******************88");
	// 		console.log(data);
    //       if ( data.length === 0) {
    //
    //         book['BookID'] = 4;
    //         book['name'] = 'Cloud Computing';
    //         book['Professor'] = 'Choi';
    //         book['img'] = 'img';
    //         book['rating'] = '9.5/10';
    //         book['availability'] = '25';
    //         this.api.postBook(book)
    //             .subscribe(res => {
    //
    //               this.router.navigate(['/user-profile', res._id]);
    //
    //             }, (err) => {
    //               console.log(err);
    //             });
    //       }
    //
    //     });
      // this.api.getBook('5')
      //     .subscribe(data => {
      //         console.log("*******************88");
      //         console.log(data);
      //         if ( data.length === 0) {
      //
      //             book['BookID'] = 5;
      //             book['name'] = 'Network Architecture';
      //             book['Professor'] = 'Choi';
      //             book['img'] = 'img';
      //             book['rating'] = '9.5/10';
      //             book['availability'] = '25';
      //             this.api.postBook(book)
      //                 .subscribe(res => {
      //
      //                     this.router.navigate(['/user-profile', res._id]);
      //
      //                 }, (err) => {
      //                     console.log(err);
      //                 });
      //         }
      //
      //     });
}
}
