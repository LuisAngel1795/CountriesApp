import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{


  public countries: Country[] = [];
  constructor(private service: CountriesService){

  }
  ngOnInit(): void {
    if(!this.service.countries) return;
      this.countries = this.service.countries;
  }
  searchByCountry(term: string):void{
    this.service.search(term,'name').subscribe(
      countries => {
        this.countries = countries;
      }
    );

  }
}
