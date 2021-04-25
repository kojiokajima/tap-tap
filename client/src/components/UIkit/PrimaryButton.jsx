import React from 'react'
import {Button} from '@material-ui/core'
import styled from 'styled-components'
// import {styled} from '@material-ui/styles'

const PrimaryButton = ({label, onClick}) => {
  return (
    <div>
      <MyButton onClick={onClick} type="submit" >{label}</MyButton>
    </div>
  )
}

export default PrimaryButton

// const MyButton = styled(Button)({
//   color: 'red',
//   backgroundColor: '#D77A61',
//   border: '1px, solid, blue',
//   padding: '20px',
// });

const MyButton = styled(Button)`
  background-color: #D77A61;
  color: white;
  &:hover {
    color: #D77A61;
    background-color: white;
    border: 1px solid #D77A61
  }
`;