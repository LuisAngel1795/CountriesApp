import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

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
    if(!this.service.countries) return;
      this.countries = this.service.countries;
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
