import { Component, OnInit } from '@angular/core';
import {
  Subscription,
  concatMap,
  delay,
  exhaustMap,
  filter,
  flatMap,
  from,
  interval,
  map,
  mergeMap,
  of,
  repeat,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent {
  private _subscription?: Subscription;
  public numbers: number[] = [];

  private _resetState() {
    this.numbers = [];
    if (this._subscription) this._subscription.unsubscribe();
  }

  private _saveNumbersToState(val: number) {
    this.numbers = [...this.numbers, val];
  }

  public first() {
    this._resetState();
    const s$ = interval(400).pipe(
      exhaustMap((el) => of(el).pipe(delay(100), repeat(4)))
    );
    s$.subscribe(this._saveNumbersToState.bind(this));
  }

  public second() {
    this._resetState();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const s$ = from(values).pipe(mergeMap(() => from(values)));
    s$.subscribe(this._saveNumbersToState.bind(this));
  }

  public third() {
    this._resetState();
    const s$ = interval(400).pipe(
      filter((num) => num % 2 === 0),
      concatMap((el) => of(el).pipe(delay(400), repeat(5)))
    );
    s$.subscribe(this._saveNumbersToState.bind(this));
  }

  public fourth() {
    this._resetState();
    const s$ = interval(400).pipe(
      mergeMap((el) => of(el).pipe(delay(100), repeat(5)))
    );
    s$.subscribe(this._saveNumbersToState.bind(this));
  }

  public clear() {
    this._resetState();
  }
}
