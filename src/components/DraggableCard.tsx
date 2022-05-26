import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

const Card = styled.div<{isDragging : boolean}>`
  border-radius : 5px;
  padding : 10px 10px;
  width:200px;
  background-color : ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow : ${(props) => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
  margin-bottom:10px;
`
const DeleteBtn = styled.span`
    cursor : "pointer";

`
//isDragging 은 지금 드래깅 하고 있는 Card를 말함 
interface IDragCard {
    toDoId :number;
    toDoText :string;
    index:number;
}


function DraggableCard({toDoId,toDoText,index}:IDragCard) {
    const setToDos = useSetRecoilState(toDoState)
    const todoDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
        console.log(index,toDoId)
        setToDos((allToDos)=> {
            const copyToDos = {...allToDos}
            const keys = Object.keys(copyToDos);
            keys.forEach((key) => {
              copyToDos[key] = allToDos[key].filter(
                (toDoCard) => toDoCard.id !== toDoId
              );
            });
            return copyToDos;
        })
    }
    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
            {(magic , snapshot)=> 
                <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps} >
                    {toDoText}
                    <DeleteBtn onClick={todoDelete}>❌</DeleteBtn></Card> }
        </Draggable>
    )
}
export default React.memo(DraggableCard)