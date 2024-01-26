import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.scss',
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.listings = fakeListings;
  }
}
