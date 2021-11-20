'use strict';
const ranks = {
  100: 'がんばろう',
  200: 'THE一般人',
  250: '一般人にしてはよき',
  280: '駆け出しタイパー',
  310: '初心者タイパー',
  340: '中級者タイパー',
  380: '上級者タイパー',
  420: 'タイピングガチ勢',
  460: 'タイピングマスター',
  500: 'タイプ王',
  550: 'タイプ神',
  600: 'キーボード壊れますよ？',
  700: '縺ｩ縺�＠縺ｦ縺昴ｓ縺ｪ騾溘＞繧難ｼ�',
}


const judgeRank = (score) => {
  let judgedRank = 'トホホ。。';
  Object.keys(ranks).forEach(key =>{
    if (score >= key) {
      judgedRank = ranks[key];
    }
  });
  return judgedRank;
};
