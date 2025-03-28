import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import { todoItem } from './todos.model';

//we should mention the type for an our state
type TodoState={
    todos:todoItem[]
}
//we should initialize the our state with this value
const initialState:TodoState={
    todos:[]
}
export const ToDostore=signalStore(
    {providedIn:'root'},
    withState(initialState),
    withMethods((store)=>({
        addToDo(title:string){
            const todo:todoItem={title,id:new Date().toISOString(),completed:false};
            patchState(store,{todos:[todo,...store.todos()]})
        },
        toggleToDo(id:string){
            patchState(store,{
                todos:store.todos().map((t)=>{
                    if(t.id==id){t['completed']=!t['completed']};
                    return t
                })
            })
        }
    }))
);