import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})

export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
  public term: string = '';
  public isLoading: boolean = false;
  constructor(private service: CountriesService){

  }



  ngOnInit(): void {
      this.countries = this.service.cacheStore.byCapital.countries;
      this.term = this.service.cacheStore.byCapital.term;
  }



  searchByCapital(term: string):void{
    this.countries = [];
    this.isLoading = true;
    this.service.search(term,'capital').subscribe(
      countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    );

  }


}
