import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeListings, fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.scss',
})
export class EditListingPageComponent implements OnInit {
  listing?: Listing;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listing = fakeMyListings.find((listing) => listing.id === id);
  }

  onSubmit(): void {
    alert('Saving changes to the listing...');
    this.router.navigateByUrl('/my-listings');
  }
}
