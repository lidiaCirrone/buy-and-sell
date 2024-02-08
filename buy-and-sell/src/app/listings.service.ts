import { Injectable } from '@angular/core';
import { Listing } from './types';
import { fakeListings } from './fake-data';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor() {}

  getListings(): Listing[] {
    return fakeListings;
  }
}
