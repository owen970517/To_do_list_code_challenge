import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import DraggableCard from './DraggableCard';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IToDo, toDoState } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Wrapper = styled.div`
  padding : 10px 0px;
  background-color : ${(props) => props.theme.boardColor};
  border-radius : 5px;
  min-height :300px;
  display: flex;
  flex-direction : column;
`

const Title = styled.h1`
    text-align:center;
    font-weight : 600;
    margin-bottom : 10px;
    font-size:18px;
`
const Area = styled.div<IArea>`
    background-color : ${(props) => props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThisWith ? "#b2bec3" : 'transparent'};
    flex-grow :1;
    transition : background-color .3s ease-in-out;
    padding : 20px;
`

const Form = styled.form`
    input {
        width : 100%;
    }
`
const DelBtn = styled.button`
    margin-left :10px;
    background : transparent;
    border :none;
    cursor : pointer;
`

interface IBoard {
    toDos : IToDo[];
    boardId : string
}

interface IArea {
    // 이동하고 싶은 곳 
    isDraggingOver:boolean;
    // 이동되어 온 곳 
    isDraggingFromThisWith:boolean;
}
interface IForm {
    toDo :string;
}

function Board({toDos,boardId}:IBoard) {
    const setToDos= useSetRecoilState(toDoState);
    const {register , setValue , handleSubmit} = useForm<IForm>()
    const onValid = ({toDo}:IForm) => {
        const newToDo = {
            id:Date.now(),
            text : toDo,
        };
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId] : [
                    ...allBoards[boardId],
                    newToDo
                ]
            }
        })
        setValue("toDo" ,"")
    }
    const deleteBtn = (e:React.MouseEvent<HTMLButtonElement>) => {
        setToDos((allBoards) => {
            const copyForm = Object.entries(allBoards);
            const newForm = copyForm.filter((v) => v[0] !== boardId);
            const newFormObj = Object.fromEntries(newForm);
            return { ...newFormObj };
          });
    }
    return (
        <Wrapper>
            <Title>{boardId}<DelBtn onClick ={deleteBtn}>❌</DelBtn></Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo" , {required:true})} type="text" placeholder ="적어"></input>
            </Form>
            <Droppable droppableId={boardId}>
            { (magic , snapshot) => 
            <Area isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                { toDos?.map((toDo ,index) =>
                <DraggableCard 
                    key={toDo.id} 
                    toDoId={toDo.id} 
                    toDoText = {toDo.text} 
                    index = {index}/>
                )}
                {magic.placeholder}
            </Area>}
            </Droppable>

        </Wrapper>
    )
}
export default Board