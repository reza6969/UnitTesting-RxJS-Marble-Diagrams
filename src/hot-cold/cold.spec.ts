import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, Observable, throwError, from, EMPTY } from 'rxjs';

describe('COLD', () => {
  it('of with one value', () => {

  });

  it('of with 2 values', () => {

  });

  it('from', () => {

  });

  it('should trim the spaces', () => {
  });
  it('can searched an alphabet', () => {
    const provided = search('e');
    const expected = cold('(e|)');
    expect(provided).toBeObservable(expected);
  });

  it('can return empty when no value found', ()=>{
    const provided = search('E');
    const expected = cold('|');
    expect(provided).toBeObservable(expected);
  });

  it('can search vowels', ()=>{
    const provided = searchVowels();
    const expected = cold('(aeiou|)');
    expect(provided).toBeObservable(expected);
  });
});

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
];

function search(val) {
  return alphabet.indexOf(val) > -1 ? of(`${val}`): EMPTY;
}

function searchVowels() {
  const vowels = alphabet.filter( s =>
    ['a', 'e', 'i', 'o', 'u'].indexOf(s) > -1 ? true : false
  );
  return from(vowels);
}