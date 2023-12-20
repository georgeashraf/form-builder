import { alt, match, seq } from './main';

describe('matchCombinator', () => {
  it('should match the desired string and return a success response', () => {
    const matchFoo = match('foo');
    const testString = 'fooBar';
    expect(matchFoo(testString)).toEqual({
      rest: 'Bar',
      value: 'foo',
    });
  });
});

describe('altCombinator', () => {
  it('should match the either of the desired matches and return a success response', () => {
    const matchFoo = match('foo');
    const matchBar = match('bar');
    const matchFooOrBar = alt(matchFoo, matchBar);
    const testString = 'fooBar';
    expect(matchFooOrBar(testString)).toEqual({
      rest: 'Bar',
      value: 'foo',
    });
  });
  it('should match the either of the desired matches and return a success response', () => {
    const matchFoo = match('foo');
    const matchBar = match('bar');
    const matchFooOrBar = alt(matchFoo, matchBar);
    const testString = 'barfoo';
    expect(matchFooOrBar(testString)).toEqual({
      rest: 'foo',
      value: 'bar',
    });
  });
});

describe('seqCombinator', () => {
  it('should match the sequence of the desired matches and return a success response', () => {
    const matchFoo = match('foo');
    const matchBar = match('bar');
    const matchSeqFooOrBar = seq(matchFoo, matchBar);
    const testString = 'foobar';
    expect(matchSeqFooOrBar(testString)).toEqual({ rest: '', value: 'foobar' });
  });
  it('should match the sequence of the desired matches and return a success response', () => {
    const matchFoo = match('foo');
    const matchBar = match('bar');
    const matchSeqFooOrBar = seq(matchFoo, matchBar);
    const testString = 'foobarr';
    expect(matchSeqFooOrBar(testString)).toEqual({
      rest: 'r',
      value: 'foobar',
    });
  });
  it('should not match the sequence of the desired matches and return a failure response', () => {
    const matchFoo = match('foo');
    const matchBar = match('bar');
    const matchSeqFooOrBar = seq(matchBar, matchFoo);
    const testString = 'foobar';
    expect(matchSeqFooOrBar(testString)).toEqual({ rest: 'foobar' });
  });
});
