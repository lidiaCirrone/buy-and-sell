import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';

@Component({
  selector: 'app-listing-detail-page',
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.scss',
})
export class ListingDetailPageComponent implements OnInit {
  listing?: Listing;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listing = fakeListings.find((listing) => listing.id === id);
  }
}
