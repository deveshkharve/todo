import {
  Autocomplete,
  Box,
  Button,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Paper,
  MenuItem,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";
import React, { useState } from "react";
import { isTokenValid } from "../src/auth";
import { createTask, deleteTask, getTaskList, updateTask } from "../src/tasks";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TaskItem from "../components/Tasks";



const lightTheme = createTheme({ palette: { mode: "light" } });

const ToDoHome = () => {
  const router = useRouter();
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();
  const [taskTitle, setTaskTitle] = useState();
  const [taskStatus, setTaskStatus] = useState('todo');
  const [taskDescription, setTaskDescription] = useState();
  const [taskDueDate, setDueDate] = useState();

  React.useEffect(() => {
    isTokenValid()
    .then(result => {
      if (!result){
        push('/login')
      } else {
        getTaskList().then( data => { if (!tasks) setTasks(data.tasks)} )
      } 
    })
  }, []);


  const resetForm = () => {
    setTasks()
    setTaskTitle()
    setTaskStatus()
    setTaskDescription()
  }
  const submitForm = () => {
    console.log(taskTitle)
    createTask(taskTitle, taskStatus, taskDescription, taskDueDate).then(result => {
      console.log('task created')
      resetForm()
      const updatedTasks = [...tasks, ...result.tasks]
      setTasks(updatedTasks)
    })
  }

  const updateTaskItem = (id, title, description, status, dueDate) => {
    console.log('task updated', id, title, description, status, dueDate)
    updateTask(id, title, status, description)
    .then(res => { 
      getTaskList().then( data => {
        console.log('refresh after update')
        setTasks(data.tasks)} )
    })

  }

  const deleteTaskItem = (id) => {
    console.log('delete task', id)
    deleteTask(id)
    .then(res => {
      getTaskList()
      .then( data => { 
        setTasks(data.tasks)} )
    })
  }

  return (
    
    <ThemeProvider theme={lightTheme}>
      {/* ------------------------- light-theme CONTAINER */}
      <Box color="#000" bgcolor="#FEFBEB" width="100vw" height="100vh">
        {/* ------------------------- INNER CONTAINER */}
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => {
            localStorage.removeItem('token');
            push('/login');
          }}
        >
          Logout
        </Button>
        <Box maxWidth="1100px" m="0 auto">
          <Stack
            justifyContent="center"
            alignItems="center"
            height="100vh"
            gap={7}>
            <Typography variant="h2" lineHeight={1} textAlign="center">
              TODOers
            </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks && tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <TextField
                        select
                        value={task.status}
                        onChange={(event) => updateTaskItem(task.id, task.title, task.description, event.target.value, task.dueDate)}
                        InputProps={{ disableUnderline: true }}
                        width="15%"
                      >
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="in progress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <b>{task.title}</b>
                    </TableCell>
                    <TableCell>
                    {task.description}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteTaskItem(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow >
                    <TableCell>
                      <TextField
                        select
                        value={taskStatus}
                        onChange={(event) => setTaskStatus(event.target.value)}
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                      >
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        style= {{border: 'none'}}
                        type="text"
                        value={taskTitle}
                        placeholder="Task"
                        onChange={(event) => setTaskTitle(event.target.value)}
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        value={taskDescription}
                        placeholder="Description..."
                        onChange={(event) => setTaskDescription(event.target.value)}
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => submitForm()}>
                        Create
                      </Button>
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ToDoHome;
