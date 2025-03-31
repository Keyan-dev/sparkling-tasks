import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { toDoFilterType, todoItem } from './todos.model';
import { computed, effect } from '@angular/core';

//we should mention the type for an our state
type TodoState = {
    todos: todoItem[],
    toDoFilter: toDoFilterType
}

//we should initialize the our state with this value
const initialState: TodoState = {
    todos: [],
    toDoFilter: 'all'
}
//to do store signal store return instance of an service so we need to use it 
export const ToDostore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ todos, toDoFilter }) => ({
        completedToDos: computed(() => {
            return todos().filter((e) => e.completed);
        }),
        filteredToDos: computed(() => {
            switch (toDoFilter()) {
                case 'completed':
                    return todos().filter((e) => e.completed);
                case 'pending':
                    return todos().filter((e) => !e.completed);
                default:
                    return todos();
            }
        })
    })),
    withMethods((store) => ({
        addToDo(title: string) {
            const todo: todoItem = { title, id: new Date().toISOString(), completed: false };
            patchState(store, { todos: [todo, ...store.todos()] })
        },
        toggleToDo(id: string) {
            patchState(store, {
                todos: store.todos().map((t) => {
                    if (t.id == id) { t['completed'] = !t['completed'] };
                    return t
                })
            })
        },
        toggleFilter(filterValue: toDoFilterType) {
            patchState(store, { toDoFilter: filterValue })
        }
    })),
    withHooks({
        onInit: (store) => {
            effect(() => {
                const storeState = getState(store);
                localStorage.setItem('toDoList', JSON.stringify(storeState.todos));
            })
            patchState(store, { todos: JSON.parse(localStorage.getItem('toDoList') as any || '[]') });
        }
    })
);