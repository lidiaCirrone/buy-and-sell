import { Injectable } from '@angular/core';
import { Listing } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, user } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient, private auth: Auth) {}
  user$ = user(this.auth);

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions
    );
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      this.user$.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .get<Listing[]>(
                  `/api/users/${user.uid}/listings`,
                  httpOptionsWithAuthToken(token)
                )
                .subscribe((listings) => {
                  observer.next(listings);
                });
            } else {
              observer.next([]);
            }
          });
      });
    });
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete(`/api/listings/${id}`);
  }

  createListing(
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return this.http.post<Listing>(
      '/api/listings',
      { name, description, price },
      httpOptions
    );
  }

  editListing(
    id: string,
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}`,
      { name, description, price },
      httpOptions
    );
  }
}
