import React from "react";
import List from '@mui/material/List';
import { styled } from '@mui/system';
import { Chat } from './index';

const StyledList = styled(List)({
  height: 400, // 400px超えたらスクロールバーが出てくる
  padding: '0',
  overflow: 'auto'
});

const Chats = (props) => {
  return (
    <StyledList id="scroll-area">
      {props.chats.map((chat, index) => {
        // 配列にはkeyが必要なのでkeyも書く（文字列である必要がある（推奨）のでkeyはstringとなる）
        return <Chat text={chat.text} type={chat.type} key={index.toString()} />
      })}
    </StyledList>
  );
}

export default Chats;
