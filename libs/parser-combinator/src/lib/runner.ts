import { alt, match, seq, succeed } from './main';

// left recursive grammar
const altParser = alt();
const seqParser = seq();
const matchParser = match();
const successParser = succeed();
// @ts-ignore
const ps = altParser(
// @ts-ignore

    () => seqParser(ps, matchParser('a')) , matchParser('a')
    
    );
const testSuccess = successParser('a')
const testMatch = matchParser('a')
const seqTest = seqParser(matchParser('a'), matchParser('b'))
// const xCOnsole = (x: Function) => {
//     console.log(x.toString())
// }
// seqTest('abc', console.log);
// success('hhhd', console.log)
// testSuccess('a', console.log)
// testMatch('a', console.log)

ps('aaa', console.log)