// todolist.js
import React, { useState } from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import './index.css';
import axios from 'axios';

const TodoList = ({ item, index, deleteItem, markAsDone, editItem, showDeleteIcon, openModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    // Assuming your backend supports DELETE requests for tasks
    await axios.delete(`http://localhost:3000/todos/${item.id}`);
    deleteItem(index);
  };

  const handleMarkAsDone = () => {
    if (markAsDone) {
      markAsDone(index);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    form
      .validateFields()
      .then(async values => {
        const convertedValues = {
          ...values,
          dueDate: values.dueDate ? new Date(values.dueDate).toLocaleString() : null,
          setTime: values.setTime ? new Date(values.setTime).toLocaleString() : null,
        };

        // Assuming your backend supports PUT requests for tasks
        await axios.put(`http://localhost:3000/todos/${item.id}`, convertedValues);
        editItem(index, convertedValues);
        setIsEditing(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  return (
    <Card className="card" title="Task Details" extra={<a href="#"></a>} style={{ marginBottom: '10px' }}>
      {isEditing ? (
        <Form form={form} initialValues={item} layout="vertical">
          <Form.Item label="Task Title" name="taskTitle">
            <Input />
          </Form.Item>
          <Form.Item label="Due Date" name="dueDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Set Time" name="setTime">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" onClick={handleEditConfirm}>
            Confirm
          </Button>
          <Button onClick={handleEditCancel}>Cancel</Button>
        </Form>
      ) : (
        <>
          <div>
            <strong>Task Title:</strong> {item.title}
          </div>
          <div>
            <strong>Due Date:</strong> {item.dueDate && new Date(item.dueDate).toLocaleString()}
          </div>
          <div>
            <strong>Set Time:</strong> {item.setTime && new Date(item.setTime).toLocaleString()}
          </div>
          <div>
            <strong>Note:</strong> {item.task}
          </div>
          <span className="icons">
            {showDeleteIcon && (
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            )}
            {markAsDone && (
              <Button type="primary" onClick={handleMarkAsDone} icon={<CheckCircleOutlined />}>
                Mark as Done
              </Button>
            )}
            <Button type="primary" onClick={handleEdit} icon={<EditOutlined />}>
              Edit in Modal
            </Button>
          </span>
        </>
      )}
    </Card>
  );
};
export default TodoList;
