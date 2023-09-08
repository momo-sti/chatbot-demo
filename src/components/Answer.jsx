import React from "react"
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)({
  borderColor: '#FFB549',
  color: '#FFB549',
  marginBottom: '8px',
  '&:hover': {
    borderColor: '#FFB549',
    backgroundColor: '#FFB549',
    color: '#fff',
  },
});

const Answer = (props) => {
  return (
    <StyledButton
      variant="outlined"
      onClick={() => props.select(props.content, props.nextId)}
    >
      {props.content}
    </StyledButton>
  );
}


export default Answer