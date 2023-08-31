import { Region } from './../interfaces/region.type';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store-interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore : CacheStore={
    byCapital: {term:'',countries:[]},
    byCountries: {term:'',countries:[]},
    byRegion: {region:'',countries:[]}
  }



  constructor(private httpClient: HttpClient) {
    this.loadFromLocaStorage();
  }



  private saveToLocaStorage(): void{
      localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }
  private loadFromLocaStorage(): void{
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
}


  public searchCountryByAlphaCode(term: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(
          () => of(null)
        )
      );
  }


  public search(term: string, resource: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${resource}/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        tap(countries => {
          if(resource ==='capital'){
            this.cacheStore.byCapital = {term,countries};
          }
          if(resource ==='name'){
            this.cacheStore.byCountries = {term,countries};
          }
          if(resource ==='region'){
            this.cacheStore.byRegion = { region: term as Region,countries};
          }
        }
        ),
        tap(countries => this.saveToLocaStorage()),
        catchError(
          () => of([])
        )
      );
  }

}
