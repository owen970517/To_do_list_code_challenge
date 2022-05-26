import { atom ,selector} from "recoil";
import { recoilPersist } from "recoil-persist";

 const  { persistAtom} = recoilPersist({
    key : "boardToDo",
}) 

export interface IToDo {
    id :number;
    text :string;
}
interface IToDoState {
    [key:string] : IToDo[],
}

export const toDoState = atom<IToDoState>({
    key : "toDo",
    default : {

    },
    effects_UNSTABLE: [persistAtom],
})