import React from "react";
import { useForm } from "react-hook-form"
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import styled from 'styled-components';
interface IForm {
    boardname : string;
}

const Form = styled.form`
  text-align:center;
  margin-bottom:10px;
`
const CreateInput = styled.input`
  padding:10px;
  font-size:20px;
  border-radius:10px;
  border:none;
`
const ErrorMsg = styled.span`
  color : red;
  font-size:20px;
`

function CreateBoard() {
    const {register , setValue , handleSubmit , formState: { errors },setError} = useForm<IForm>();
    const [toDos , setToDos] =useRecoilState(toDoState);

    const onValid = ({ boardname }: IForm) => {
        if (boardname !== "") {
          if (
            Object.keys(toDos).some((v) => v.toLowerCase() === boardname.toLowerCase())
          ) return setError("boardname", {message: "이미 존재 하는 이름입니다."})

          setToDos({ ...toDos, [boardname]: [] });
          setValue("boardname", "");
        }
      };
    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <CreateInput {...register("boardname" , {required :true , maxLength : { value : 10 , message :"10자 이내로 입력해주세요."}} )} type="text" placeholder="board name"></CreateInput><br/>
            <ErrorMsg>{errors.boardname && errors.boardname.message}</ErrorMsg>
        </Form>
    )
}
export default CreateBoard