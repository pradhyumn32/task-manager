import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Snackbar,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const statuses = ['To Do', 'In Progress', 'Done'];

export default function Tasks({ token }) {
  const [grouped, setGrouped] = useState({});
  const [title, setTitle] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [editDialog, setEditDialog] = useState({ open: false, task: null });
  const [editTitle, setEditTitle] = useState('');

  const fetchTasks = async () => {
    const data = await getTasks(token);
    setGrouped(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title: title.trim() }, token);
    setTitle('');
    setSnackbar({ open: true, message: 'Task added!' });
    fetchTasks();
  };

  const handleUpdate = async (id, status = null, title = null) => {
    await updateTask(id, status, title, token);
    fetchTasks();
    if (status) {
      setSnackbar({ open: true, message: `Task moved to "${status}"` });
    } else {
      setSnackbar({ open: true, message: 'Task updated!' });
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    fetchTasks();
    setSnackbar({ open: true, message: 'Task deleted' });
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      handleUpdate(draggableId, destination.droppableId);
    }
  };

  const openEdit = (task) => {
    setEditDialog({ open: true, task });
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    await handleUpdate(editDialog.task.id, null, editTitle);
    setEditDialog({ open: false, task: null });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📝 Your Tasks
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
        <TextField
          fullWidth
          label="New Task Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add Task
        </Button>
      </Stack>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {statuses.map((status) => (
            <Grid item xs={12} sm={4} key={status}>
              <Typography variant="h6" textAlign="center" gutterBottom>
                {status}
              </Typography>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {grouped[status]?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Collapse in={true}>
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              variant="outlined"
                              sx={{
                                mb: 2,
                                opacity: snapshot.isDragging ? 0.7 : 1,
                                transition: 'all 0.3s ease-in-out',
                              }}
                            >
                              <CardContent>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography>{task.title}</Typography>
                                  <Stack direction="row" spacing={1}>
                                    <IconButton
                                      size="small"
                                      onClick={() => openEdit(task)}
                                    >
                                      <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() =>
                                        window.confirm('Delete task?') &&
                                        handleDelete(task.id)
                                      }
                                    >
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Stack>
                                </Stack>

                                <Stack direction="row" spacing={1} mt={2}>
                                  {status === 'To Do' && (
                                    <Button
                                      size="small"
                                      variant="contained"
                                      onClick={() =>
                                        handleUpdate(task.id, 'In Progress')
                                      }
                                    >
                                      Start
                                    </Button>
                                  )}
                                  {status !== 'Done' && (
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      onClick={() =>
                                        handleUpdate(task.id, 'Done')
                                      }
                                    >
                                      Mark Done
                                    </Button>
                                  )}
                                </Stack>
                              </CardContent>
                            </Card>
                          </Collapse>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, task: null })}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, task: null })}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}
