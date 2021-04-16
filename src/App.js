import './App.css';
import TextField from '@material-ui/core/TextField'
import {useState,useEffect} from 'react'
import Button from '@material-ui/core/Button/Button';
import { db } from './firebase_config';
import firebase from 'firebase'
import TodoListItem from './Todo'
function App() {
  const [todoInput, setTodoInput] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    getTodos()
    sortTodos()
  },[])

  function sortTodos(){
    setTodos(todos.sort((a,b)=>b.timestamp-a.timestamp))

  }
  function addTodo(e){
    e.preventDefault();
    if(todoInput.length>0){
    db.collection("todos").add({
      inProgress:true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput
    });
  }
    setTodoInput("")
  }

  function getTodos(){
    db.collection("todos").onSnapshot(function(querySnapshot){
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inProgress: doc.data().inProgress,
          timestamp:doc.data().timestamp
        }))
      );
    })
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
        <form>
        <h1>Naman Bhandari Todos App 😃</h1>
        <TextField id="standard-basic" label="Write a Todo" style={{ width: "90vw", maxWidth: "500px" }}
        onChange={(e)=> setTodoInput(e.target.value)} value={todoInput}/>
        <Button type="submit" variant="contained" onClick={addTodo} style={{display:'none'}}/>
        </form>
        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
          {todos.sort((a,b)=>a.timestamp>b.timestamp?1:-1)
          .map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inProgress={todo.inProgress}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
