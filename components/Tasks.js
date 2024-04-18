import { useState } from 'react';
import { Card, Typography, Button, TextField, MenuItem, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTask } from '../src/tasks';

const TaskItem = ({ item, action }) => {
  const [id] = useState(item.id || null);
  const [taskTitle, setTaskTitle] = useState(item.title || null);
  const [taskDescription, setTaskDescription] = useState(item.description || null);
  const [taskDueDate, setTaskDueDate] = useState(item.due_date || null);
  const [taskStatus, setTaskStatus] = useState(item.status || null);

  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setTaskDueDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const submitForm = () => {
    let exec
    if (action == 'create') {
      createTask(taskTitle, taskStatus, taskDescription, taskDueDate)
      .then(res => {
        window.location.reload();
      })
    } else if (action == ' update' && id) {
      updateTask(id, taskTitle, taskStatus, taskDescription, taskDueDate)
    }
  }

  return (
    <Card elevation={2} sx={{ pt: 1, pb: 0.5, px: 2, borderRadius: 2 }}>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            style={{border: "0px"}}
            value={taskTitle}
            onChange={handleTitleChange}
            placeholder='Title'
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Status"
            value={taskStatus}
            onChange={handleStatusChange}
            fullWidth
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Accordion >
        <AccordionSummary
          style={{height: "16px"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="details-content"
          id="details-header"
        >
          <Typography style={{height: "16px"}}>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            placeholder="Description"
            value={taskDescription}
            onChange={handleDescriptionChange}
            fullWidth
          />
          <TextField sx={{ mt: 2, borderRadius: 2 }}
            type="date"
            value={taskDueDate}
            onChange={handleDueDateChange}
            fullWidth
          />
          <Button
            onClick={() => submitForm()}
            sx={{
              textTransform: "none",
              alignSelf: "start",
              p: "3px 15px",
              backgroundColor: '#e8e8e8'
            }}>
            {action}
          </Button>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default TaskItem;
