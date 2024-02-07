// TodoList.tsx

import React, { useState } from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Form, Input, DatePicker, TimePicker } from 'antd';

interface Todo {
  taskTitle: string;
  dueDate: string | null;
  setTime: string | null;
  note: string;
}

interface TodoListProps {
  item: Todo;
  index: number;
  deleteItem: (index: number) => void;
  markAsDone?: (index: number) => void;
  editItem: (index: number, editedTask: Todo) => void;
  showDeleteIcon?: boolean;
  openModal: (index: number, data: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  
  item,
  index,
  deleteItem,
  markAsDone,
  editItem,
  showDeleteIcon,
  openModal,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Todo>({ ...item });
  const [form] = Form.useForm();

  const handleDelete = () => {
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
      .then(values => {
        const convertedValues: Todo = {
          ...values,
          dueDate: values.dueDate ? new Date(values.dueDate).toLocaleString() : null,
          setTime: values.setTime ? new Date(values.setTime).toLocaleString() : null,
        };

        editItem(index, convertedValues);
        setIsEditing(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...item });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Todo) => {
    setEditedTask({ ...editedTask, [field]: e.target.value });
  };

  return (
    <Card
      className="card"
      title="Task Details"
      extra={<a href="#"></a>}
      style={{ marginBottom: '10px' }}
    >
      {isEditing ? (
        <Form form={form} initialValues={editedTask} layout="vertical">
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
            <strong>Task Title:</strong> {item.taskTitle}
          </div>
          <div>
            <strong>Due Date:</strong> {item.dueDate && new Date(item.dueDate).toLocaleString()}
          </div>
          <div>
            <strong>Set Time:</strong> {item.setTime && new Date(item.setTime).toLocaleString()}
          </div>
          <div>
            <strong>Note:</strong> {item.note}
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
            <Button type="primary" onClick={() => openModal(index, item)} icon={<EditOutlined />}>
              Edit in Modal
            </Button>
          </span>
        </>
      )}
    </Card>
  );
};

export default TodoList;
