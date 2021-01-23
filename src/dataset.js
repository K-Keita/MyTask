import cat from "./public/images/cat.jpg";
import basket from "./public/images/basket.jpg";
import dog1 from "./public/images/dog1.jpg";
import dog2 from "./public/images/dog2.jpg";
import female1 from "./public/images/female1.jpg";
import female2 from "./public/images/female2.jpg";
import female3 from "./public/images/female3.jpg";
import female4 from "./public/images/female4.jpg";
import male1 from "./public/images/male1.jpg";
import male2 from "./public/images/male2.jpg";
import male3 from "./public/images/male3.jpg";
import male4 from "./public/images/male4.jpg";
import male5 from "./public/images/male5.jpg";
import male6 from "./public/images/male6.jpg";
import view from "./public/images/view.jpg";

export const homeCards = [
  {
    mode: "morning",
    icon: { path: male1 },
    username: "堀健太郎",
    message: "これから、ランニング。天気も良くて最高！",
    time: "7 : 00",
    taskNum: 3,
    taskList: [],
  },
  {
    mode: "morning",
    icon: { path: male3 },
    username: "tomoaki",
    message: "試験まで、後三日。今日も1日がんばります。",
    time: "6 : 40",
    taskNum: 3,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: female2 },
    username: "はるか",
    message: "今日は、苦手科目を重点的に勉強しました。",
    time: "6 : 30",
    taskNum: 3,
    runTask: 4,
    taskList: [],
  },
  {
    mode: "morning",
    icon: { path: male4 },
    username: "ひろあき",
    message: "今日も面接があります。悔いの無いように、全力を出し切りたいです。",
    time: "7 : 16",
    taskNum: 5,
    taskList: [
      "面接練習",
      "リーダブルコードを読む",
      "ポートフォリオの改良",
      "Reactの知識を深める",
      "もくもく会参加",
    ],
  },
  {
    mode: "night",
    icon: { path: female3 },
    username: "kibayasi",
    message: "今日は、10ページ進めました。明日も継続していきます！",
    time: "9 : 30",
    taskNum: 4,
    runTask: 5,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: dog2 },
    username: "ヒデちゃん",
    message: "タスク全然終わらなかった。明日、早起きして頑張ろう。",
    time: "6 : 00",
    taskNum: 2,
    runTask: 5,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: female1 },
    username: "友美",
    message:
      "今日もみんなでもくもくしましたー。一人でやるよりやる気が出ますね。",
    time: "8 : 25",
    taskNum: 5,
    runTask: 4,
    taskList: [],
  },
  {
    mode: "morning",
    icon: { path: male6 },
    username: "岡本とおる",
    message: "おはようございます。今日も素敵な1日にしましょう",
    time: "5 : 30",
    taskNum: 5,
    taskList: [],
  },
  {
    mode: "morning",
    icon: { path: basket },
    username: "こーすけ",
    message: "おはようございます！朝練行ってきます！",
    time: "5 : 17",
    taskNum: 2,
    taskList: [],
  },
  {
    mode: "morning",
    icon: { path: female4 },
    username: "中村七恵",
    message: "今日は遅い起床、その分今からがんばります！",
    time: "10 : 33",
    taskNum: 3,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: dog1 },
    username: "sayusayu",
    message: "皆さん今日も1日、お疲れ様でした！",
    time: "6 : 30",
    taskNum: 4,
    runTask: 4,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: male2 },
    username: "小澤 翔",
    message: "やっとタスク終わりました！。明日も頑張りましょう。",
    time: "7 : 30",
    taskNum: 5,
    runTask: 5,
    taskList: ["早朝ランニング", "テスト勉強", "筋トレ（肩）"],
  },
  {
    mode: "morning",
    icon: { path: view },
    username: "ジュンペイ",
    message: "今日はやる事多い。みんなのタスク見て、モチベ上げていきます。",
    time: "5 : 00",
    taskNum: 6,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: cat },
    username: "Sakura",
    message:
      "バイトして、勉強して、遊んで、充実した1日でした。ありがとうございました。",
    time: "7 : 30",
    taskNum: 3,
    runTask: 3,
    taskList: [],
  },
  {
    mode: "night",
    icon: { path: male5 },
    username: "彗人",
    message: "明日もいい一日にしましょう！ お疲れ様でした！",
    time: "7 : 30",
    taskNum: 3,
    runTask: 5,
    taskList: [],
  },
];
