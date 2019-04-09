import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

 /* getCustomers(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }*/

  getUser(id: string): Observable<any> {
    const url = `${apiUrl}/user/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  ValidateUser(uname: string, upwd: string): Observable<any> {
    const url = `${apiUrl}/user/${uname}/${upwd}`;
    return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }

  postUser(data): Observable<any> {
    const url = `${apiUrl}/user`;
    console.log('***');
    console.log(url)
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: string, data): Observable<any> {
    const url = `${apiUrl}/user/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<{}> {
    const url = `${apiUrl}/user/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteBook(id: string) {
    console.log('API')
    const url = `${apiUrl}/book/${id}`;
      console.log(url);
    return this.http.delete(url, httpOptions)
        .pipe(
            catchError(this.handleError)
        );
  }
  updateBook(id: string, data): Observable<any> {
    const url = `${apiUrl}/book/${id}`;

    return this.http.put(url, data, httpOptions)
        .pipe(
            catchError(this.handleError)
        );
  }
  postBook(data): Observable<any> {
    const url = `${apiUrl}/book`;
    return this.http.post(url, data, httpOptions)
        .pipe(
            catchError(this.handleError)
        );
  }
  getBook(id: string): Observable<any> {
    const url = `${apiUrl}/book/${id}`;
    return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }
  getBooks(): Observable<any> {
    const url = `${apiUrl}/book`;
    return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }
  getUserBook(uid: string, bid: string): Observable<any> {
    const url = `${apiUrl}/uc/${uid}/${bid}`;
    return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }
  postUserBook(data): Observable<any> {
    const url = `${apiUrl}/uc`;
    return this.http.post(url, data, httpOptions)
        .pipe(
            catchError(this.handleError)
        );
  }
  getUserBooks(uid: string): Observable<any> {
    const url = `${apiUrl}/uc/${uid}`;
    return this.http.get(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }
  deleteUserBook(uid: string): Observable<any> {
    const url = `${apiUrl}/uc/${uid}`;
    return this.http.delete(url, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }
}
