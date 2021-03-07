import {useState} from 'react';
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import "./TodoList.css";
import Titulo from "./Titulo";

function Todo(){
  const [todoData, setTodoData] = useState({
    todos:[],
    newTodo:"",
  });
  const onChange = (e)=>{
    const {name, value} = e.currentTarget;
    setTodoData({...todoData, newTodo: value});
  };
  const onAddNew = (e)=>{
    if(todoData.newTodo!=''){
      let newToo = {
        description: todoData.newTodo,
        completed:false,
        id : new Date().getTime()
      };
      let newTodos = todoData.todos;
      newTodos.push(newToo);
  
      setTodoData({todos:newTodos, newTodo: ""});
    }
    
  }
  const doneHandler = (id)=>{
    const newTodos = todoData.todos.map((o)=>{
      if(o.id == id){
        o.completed = !o.completed;
      }
      return o;
    });

    setTodoData({...todoData, todos:newTodos});
  };
  const deleteHandler = (id)=>{
    const newTodos = todoData.todos.filter((o) => {
      return o.id !==id;
    });

    setTodoData({ ...todoData, todos: newTodos });
  }
  const tmpTodos = todoData.todos.map( (o)=>{return JSON.stringify(o)} ).join(" | ");
  return (
    <div className="flex flex-col items-center w-full overflow-hidden pt-32 sm:pt-16">
      <Titulo></Titulo>
      <div className="flex flex-wrap overflow-hidden">
      <NewTodo
        onChange={onChange}
        value={todoData.newTodo}
        onAddNew={onAddNew}
      ></NewTodo>
      <TodoList 
        todos={todoData.todos}
        doneHandler={doneHandler}
        deleteHandler={deleteHandler}
      ></TodoList>
      </div>
    </div>
  )
}

export default Todo;
