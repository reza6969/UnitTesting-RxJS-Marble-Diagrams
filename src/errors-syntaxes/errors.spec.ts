import { cold } from 'jasmine-marbles';
import { throwError, Observable } from 'rxjs';

describe('error Handling', () => {
  it('throwError', () => {
    
  });
  it('should work with error', () => {

  });

  it('should work with value and error', () => {

  });

  it('should have defualt error', () => {
    const source$ = throwError('server error');
    // const expected$ = cold('#');
    const expected$ = cold('#', {}, 'server error');

    expect(source$).toBeObservable(expected$);
  });
  
  it('should throw error object', () => {
    const source$ = getData();
    const expected$ = cold('#', {}, new Error('server error'));
    expect(source$).toBeObservable(expected$);
  });

  
  it('should give 2 values and then throw error', ()=> {
    const source$ = getEmployees();
    const expected$ = cold('(xy#)', {x: 'Roopa', y: 'Olga'}, new Error('server error') );
    expect(source$).toBeObservable(expected$);
  });

  function getEmployees() {
    return Observable.create(observer => {
      observer.next('Roopa');
      observer.next('Olga');
      observer.error(new Error('server error'));
    });
  }

  function getData() {
    return throwError(new Error('server error'));
  }
});

function getData() {
  return throwError(new Error('server error'));
}

function getEmployees() {
  return Observable.create(observer => {
    observer.next('orange');
    observer.error(new Error('server error'));
  });
}
