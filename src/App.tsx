import React from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import { useRecoilState} from 'recoil';
import styled from 'styled-components'
import { toDoState } from './atoms';
import Board from './components/Board';
import CreateBoard from './components/CreateBoard';



const Boards = styled.div`
  display : grid;
  width:100%;
  gap : 10px;
  grid-template-columns : repeat(3,1fr);
`

const Wrapper = styled.div`
  display:flex;
  max-width:680px;
  width : 100%;
  margin : 0 auto;
  justify-content : center;
  align-items :center;
`
const Title = styled.h1`
  text-align:center;
  font-size:30px;
  color : #fff;
  margin-bottom :10px;
  font-weight :bold;
`

function App() {
  const [toDos , setToDos] =useRecoilState(toDoState)
  // drag가 끝났을 때 실행되는 함수 , 많은 args를 줌  
  const onDragEnd = (info:DropResult) => {
    console.log(info);
    const {destination , source} = info;
    if (!destination) return;
    // same Board
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // drag 한 아이템을 삭제
        boardCopy.splice(source.index,1);
        // drag해서 삭제 된 아이템을 옮긴 인덱스에 넣는다
        boardCopy.splice(destination.index , 0 , taskObj);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        };
      });
    }
    // not same Board
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoard )=> {
        const sourceBoard = [...allBoard[source.droppableId]]
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoard[destination.droppableId]]
        sourceBoard.splice(source.index,1);
        destinationBoard.splice(destination?.index , 0 , taskObj)
        return {
          ...allBoard,
          [source.droppableId] : sourceBoard,
          [destination.droppableId] : destinationBoard,
        }
      })

    }

  }
  return (
    <>
    <Title>To-Do-List</Title>
    <DragDropContext onDragEnd={onDragEnd}>
      <CreateBoard/>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId=> <Board boardId={boardId} key = {boardId} toDos={toDos[boardId]}/>) }
        </Boards>
      </Wrapper>
    </DragDropContext>
    </>
  );
}

export default App;
