import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.scss',
})
export class ListingsPageComponent implements OnInit {
  isLoading: boolean = true;
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService.getListings().subscribe((listings) => {
      this.listings = listings;
      this.isLoading = false;
    });
  }
}
