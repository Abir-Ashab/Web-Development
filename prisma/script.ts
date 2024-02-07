// script.ts
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/todos', async (req, res) => {
  try {
    const todoList = await prisma.todoList.findMany();
    res.json(todoList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { taskTitle, note, dueDate, setTime } = req.body;

    const newTodo = await prisma.todoList.create({
      data: {
        title: taskTitle, // Fix: Use taskTitle instead of task
        task: note,       // Fix: Use note instead of task
        dueDate: dueDate,
        setTime: setTime,
      },
    });
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, task, dueDate, setTime } = req.body;

    const updatedTodo = await prisma.todoList.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        task: task,
        dueDate: dueDate,
        setTime: setTime,
      },
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await prisma.todoList.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
