import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'my-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  enrollments;
  my_enrollments = [];
  user_id ;


  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,private formBuilder: FormBuilder) {
      
  }

  ngOnInit() {

      this.user_id = this.route.snapshot.params['id'];
    this.getEnrollments();
    
  }
  getEnrollments()
  {
    this.api.getUserBooks(this.user_id)
        .subscribe(data => {
          console.log(data);
          this.enrollments = data;
          for (let i = 0; i < this.enrollments.length; i++) {
            this.api.getBook(this.enrollments[i].bid)
                .subscribe(res => {
                  console.log(res)
                  res[0].ind = i;
                      this.my_enrollments[i] = res[0];
                  console.log(this.my_enrollments[i]);
                    }, (err) => {
                      console.log(err);
                    }
                );
          }
        });
  }
  delete(id: string, ind: string)
  {
    this.api.getUserBook(this.user_id, id )
        .subscribe(data => {
          this.api.deleteUserBook(data[0]._id )
              .subscribe(data => {
                this.my_enrollments[ind].availability = this.my_enrollments[ind].availability+1;
                this.api.updateBook(this.my_enrollments[ind]._id, this.my_enrollments[ind])
                    .subscribe(res1 => {
                      this.my_enrollments.splice( Number(ind) , 1);
                        for (let j = Number(ind) ; j < this.my_enrollments.length ; j++ ) {
                            this.my_enrollments[j].ind = j;}

                    }, (err) => {
                      console.log(err);
                    });

              });

        });
  }
   
}
