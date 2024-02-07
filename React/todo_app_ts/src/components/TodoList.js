import React, { useState } from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, TimePicker } from 'antd';
import axios from 'axios';

const TodoList = ({
  item,
  index,
  deleteItem,
  markAsDone,
  editItem,
  showDeleteIcon,
  openModal,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todos/${item.id}`);
      deleteItem(item.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleMarkAsDone = () => {
    if (markAsDone) {
      markAsDone(index);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = async () => {
    try {
      const values = await form.validateFields();
      const convertedValues = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
        setTime: values.setTime ? values.setTime.format('HH:mm:ss') : null,
      };

      await axios.put(`http://localhost:3000/todos/${item.id}`, convertedValues);
      editItem(index, convertedValues);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  return (
    <Card
      className="card"
      title="Task Details"
      extra={<a href="#"></a>}
      style={{ marginBottom: '10px' }}
    >
      {isEditing ? (
        <Form form={form} initialValues={item} layout="vertical">
          <Form.Item label="Task Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Due Date" name="dueDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Set Time" name="setTime">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Note" name="task">
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
            <strong>Due Date:</strong> {item.dueDate && item.dueDate}
          </div>
          <div>
            <strong>Set Time:</strong> {item.setTime && item.setTime}
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
              <Button
                type="primary"
                onClick={handleMarkAsDone}
                icon={<CheckCircleOutlined />}
              >
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
