import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region;
  constructor(private service: CountriesService) {

  }
  ngOnInit(): void {
      this.countries = this.service.cacheStore.byRegion.countries;
      this.selectedRegion = this.service.cacheStore.byRegion.region;
  }
  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.service.search(term, 'region').subscribe(
      countries => {
        this.countries = countries;
      }
    );

  }
}
