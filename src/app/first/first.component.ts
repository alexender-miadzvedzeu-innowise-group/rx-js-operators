import { Component } from '@angular/core';
import { Subscription, interval, map, take, filter } from 'rxjs';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent {
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
    const s$ = interval(100)
      .pipe(take(20))
      .pipe(map((el) => el * 3));
    this._subscription = s$.subscribe(
      this._saveNumbersToState.bind(this)
    );
  }

  public second() {
    this._resetState();
    const s$ = interval(100).pipe(take(7));
    this._subscription = s$.subscribe(
      this._saveNumbersToState.bind(this)
    );
  }

  public third() {
    this._resetState();
    const s$ = interval(100).pipe(filter((num) => num % 2 === 0));
    this._subscription = s$.subscribe(
      this._saveNumbersToState.bind(this)
    );
  }

  public clear() {
    this._resetState();
  }
}
