import React,{useState} from "react";
import { ListItem, ListItemText, Button,TextField, Dialog,DialogActions,IconButton,DialogContent} from "@material-ui/core";
import { db } from "./firebase_config";
import Modal from "@material-ui/core/Modal/Modal";
import {Edit} from '@material-ui/icons'

export default function TodoListItem({ todo, inProgress, id }) {
    const [update,setTodo] = useState('')
    const [isOpen,setOpen] = useState(false)

    function updateTodo(){
        db.collection("todos").doc(id).update({
            todo:update
        })
        setOpen(false)
    }
    function handleOpen(){
        setOpen(true)
        setTodo(todo)
    }
    function handleClose(){
        setOpen(false)
    }
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inProgress: !inProgress,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }
  
  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inProgress ? "In Progress" : "Completed"}
        />
      </ListItem>

      <Button onClick={toggleInProgress}>
        {inProgress ? "Done" : "UnDone"}
      </Button>
      <IconButton edge="end" aria-label="Edit" onClick={handleOpen}><Edit/></IconButton>
      <Button onClick={deleteTodo}>X</Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={event => setTodo(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}