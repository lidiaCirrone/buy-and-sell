import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.scss',
})
export class MyListingsPageComponent implements OnInit {
  isLoading: boolean = true;
  listings?: Listing[];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService.getListingsForUser().subscribe((listings) => {
      this.listings = listings;
      this.isLoading = false;
    });
  }

  onDeleteClicked(listingId: string): void {
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings?.filter(
        (listing) => listing.id !== listingId
      );
    });
    alert(`Deleting your listing with id ${listingId}`);
  }
}
