import { hot, cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('concat operator', () => {
  it('should concat cold observables', () => {});

  describe('should identify subscription points in cold observable', () => {
    let obs1, sub1, obs2, sub2, expected, result;
    beforeEach(() => {
      obs1 = cold('    ---a---b|');
      sub1 = '         ^-------!';
      obs2 = cold('             ---c---d|');
      sub2 = '         --------^--------!';
      expected = cold('---a---b---c---d|');
      result = obs1.pipe(concat(obs2));
    });

    it('should match result', () => {});

    it('should identify first subscription', () => {});

    it('should identify 2nd subscription', () => {});
  });

  it('should concat hot observables', () => {});

  it('should concat 2 observables', () => {
    const $obs1 = cold('---a---b|');
    const sub1 =        '^-------!';
    const $obs2 = cold('---c---d|');
    // const sub2 =  '        ^-------!';
    const sub2 =       '--------^-------!';
    const $result = $obs1.pipe(concat($obs2));

    const $expected = cold('---a---b---c---d|');

    expect($result).toBeObservable($expected);
    expect($obs1).toHaveSubscriptions(sub1);
    expect($obs2).toHaveSubscriptions(sub2);
  });
});
