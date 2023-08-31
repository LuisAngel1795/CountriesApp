import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  private _countries: Country[] =[];

  get countries():Country[]{
    return this._countries;
  }


  constructor(private httpClient: HttpClient) { }

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
          this._countries = countries
        }
        ),
        catchError(
          () => of([])
        )
      );
  }

}
