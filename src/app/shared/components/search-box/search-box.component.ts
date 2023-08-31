import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{



  private debouncer: Subject<string> = new Subject<string>();

  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder: string = '';

  @Input()
  public value: string = '';


  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();



  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
      this.emitValue(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }



  /**
  * searchCountry
:void  */
  emitValue(value: string): void {
    this.onValue.emit(value);

  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);

  }







}
