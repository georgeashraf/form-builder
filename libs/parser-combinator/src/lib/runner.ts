import { alt, match, seq, succeed } from './main';

// left recursive grammar
const altParser = alt();
const seqParser = seq();
const matchParser = match();
const successParser = succeed();
const ps = altParser(

  () => seqParser(() => ps, () => matchParser('a')),
  () => matchParser('a')
);
// const testSuccess = successParser('a');
// const testMatch = matchParser('a');
// const seqTest = seqParser(() => matchParser('e'), () => matchParser('f'));
// const xCOnsole = (x: Function) => {
//     console.log(x.toString())
// }
// success('hhhd', console.log)
// testSuccess('a', console.log)
// testMatch('a', console.log)

// seqTest('ef', console.log);

ps('aaa', console.log);
