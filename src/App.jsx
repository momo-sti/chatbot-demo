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
    // bindすることでレンダーされるたびにselectに対してselectAnswer関数が生成されることを防ぐ（パフォーマンス低下防止）
    // bindは一度生成されコールバック関数はその後レンダーしても新しく生成されずにずっと同じ関数を使える
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      //次の回答一覧を更新
      answers: this.state.dataset[nextQuestionId].answers,
      // 新しく配列にくえたchatsを更新
      chats: chats,
      // 回答が選択されると次のquestionIdがわかるのでnextQuestionIdを入れる
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true){
      case (nextQuestionId === 'init'):
        this.displayNextQuestion(nextQuestionId)
        break;

      // nextQuestionIdがURLだった時
      case(/^https:*/.test(nextQuestionId)):
        // aタグのDOM要素を生成
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break
        
      default: 
        // 取得したチャットを更新
        const chats = this.state.chats; // 現在のチャットの状態を取得
        chats.push({
          text: selectedAnswer,
          type: 'Answer'
        }) // chatsは配列なのでpushして配列に追加
    
        // 取得したチャットがsetStateで元のチャットと置き換わる
        this.setState({
          chats: chats
        })
        // 次の質問を表示（setTimeoutで0.5秒遅延）
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
    }
  }

  // コンポーネントが初期化してレンダリングが終わった後に副作用のある処理をする
  componentDidMount(){
    const initAnswer = ""
    this.selectAnswer(initAnswer, this.state.currentId) //最初のcurrentIdはinit
  }

  componentDidUpdate(prevProps,prevState,snapshot){
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea){
      // スクロールの頂点をスクロールの高さと一緒にする＝更新されると自動で一番したにスクロールされる
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  // 異界目のレンダリングではまだanswersは初期状態で中身が空なのでcomponentDidMountでinitAnswersが実行される
  // initAnswersが実行されるとanswersがDatasetのanswersに更新される
  render() {
    return (
      // select={this.selectAnswer} はbindされたコールバック関数
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats}/>
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}
