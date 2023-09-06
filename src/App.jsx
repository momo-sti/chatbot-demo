import React from 'react';
import defaultDataset from './dataset'; // dataset.jsで作成したデータをインポート
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        answers: [],
        chats: [],
        currentId: "init",
        dataset: defaultDataset,
        open: false
    }
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    this.setState({
      answers: initAnswers
    })
  }

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const chat = {
      text: initDataset.question,
      type: 'question'
    }
    // 取得したチャットを更新
    const chats = this.state.chats; // 現在のチャットの状態を取得
    chats.push(chat) // chatsは配列なのでpushして配列に追加

    // 取得したチャットがsetStateで元のチャットと置き換わる
    this.setState({
      chats: chats
    })
  }

  // コンポーネントが初期化してレンダリングが終わった後に副作用のある処理をする
  componentDidMount(){
    this.initChats();
    this.initAnswer()
  }

  // 異界目のレンダリングではまだanswersは初期状態で中身が空なのでcomponentDidMountでinitAnswersが実行される
  // initAnswersが実行されるとanswersがDatasetのanswersに更新される
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats}/>
          <AnswersList answers={this.state.answers} />
        </div>
      </section>
    );
  }
}
