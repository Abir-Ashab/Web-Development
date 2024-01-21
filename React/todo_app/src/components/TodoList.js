import React, { useState } from 'react';
import { Card, Button, Popconfirm, Form, Input, DatePicker, TimePicker } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';

import './index.css';

const { TextArea } = Input;

function Todolist({
  item,
  index,
  deleteItem,
  markAsDone,
  editItem,
  showDeleteIcon,
  openModal,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...item });

  const [form] = Form.useForm(); // Declare form here

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
    form.setFieldsValue(editedTask);
  };

  const handleEditConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        editItem(index, values);
        setIsEditing(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...item });
  };

  const handleInputChange = (e, field) => {
    setEditedTask({ ...editedTask, [field]: e.target.value });
  };

  return (
    <Card className="card" title="Task Details" extra={<a href="#"></a>} style={{ marginBottom: '10px' }}>
      {isEditing ? (
        <Form form={form} initialValues={editedTask}>
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
            <TextArea />
          </Form.Item>
          <Button type="primary" onClick={handleEditConfirm}>
            Confirm
          </Button>
          <Button type="primary" danger onClick={handleEditCancel}>
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <div>
            <strong>Task Title:</strong> {item.taskTitle}
          </div>
          <div>
            <strong>Due Date:</strong> {item.dueDate}
          </div>
          <div>
            <strong>Set Time:</strong> {item.setTime}
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
            <Button type="primary" onClick={handleEdit} icon={<EditOutlined />}>
              Edit
            </Button>
          </span>
        </>
      )}
    </Card>
  );
}

export default Todolist;
