import { Component } from '@angular/core';
import { combineLatest, forkJoin, interval, map, merge, take } from 'rxjs';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css'],
})
export class ThirdComponent {
  public state: number[] = [0, 0, 0];
  private source1$ = interval(200).pipe(
    take(10),
    map((val) => ({ p: 0, val }))
  );
  private source2$ = interval(300).pipe(
    take(10),
    map((val) => ({ p: 1, val }))
  );
  private source3$ = interval(400).pipe(
    take(10),
    map((val) => ({ p: 2, val }))
  );

  private _updateState(e: { p: number; val: number }) {
    this.state = this.state.map((_, idx) => {
      if (e.p === idx) return e.val;
      return _;
    });
  }

  public first() {
    const s$ = merge(this.source1$, this.source2$, this.source3$);
    s$.subscribe(this._updateState.bind(this));
  }

  public second() {
    const s$ = forkJoin(this.source1$, this.source2$, this.source3$);
    s$.subscribe((res) => res.forEach(this._updateState.bind(this)));
  }

  public third() {
    const s$ = combineLatest(this.source1$, this.source2$, this.source3$);
    s$.subscribe((res) => res.forEach(this._updateState.bind(this)));
  }
}
