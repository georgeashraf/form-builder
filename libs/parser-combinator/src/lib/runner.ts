import { alt, match, seq, succeed } from './main';

const matchFoo = match('foo');
const matchBar = match('bar');
const matchFooOrBar = alt(matchFoo, matchBar);
const matchSeqFooOrBar = seq(matchFoo, matchFoo);
const success = succeed('ll')

const r = alt(() => seq(match('a'), r), match('a'));
console.log(matchFooOrBar('foofoo'));
console.log(matchFooOrBar('foofoo'));

// success('hhhd', console.log)
