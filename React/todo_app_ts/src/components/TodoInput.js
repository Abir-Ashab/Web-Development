import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './index.css';
import axios from 'axios';

const TodoInput = ({ addList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
        const convertedValues = {
          title: values.taskTitle,
          dueDate: values.dueDate ? values.dueDate.toDate() : null,
          setTime: values.setTime ? values.setTime.toDate() : null,
          task: values.note,
        };

        const results = await axios.post("http://localhost:3000/todos", convertedValues);
        addList(convertedValues);
        form.resetFields();
        setIsModalVisible(false);
      }) .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div className="input-container">
      <Button type="primary" danger onClick={showModal}>
        Enter your task details
      </Button>

      <Modal 
        title="Enter Your Task Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" type="primary" danger onClick={handleCancel} icon={<CloseOutlined />}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} icon={<CheckOutlined />}>
            Submit
          </Button>,
        ]}
        className="custom-modal"
      >
        <Form
          className="form"
          form={form}
          layout="vertical"
          name="todoForm"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Task Title"
            name="taskTitle"
            rules={[{ required: true, message: 'Please enter task title!' }]}
          >
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
        </Form>
      </Modal>
    </div>
  );
};

export default TodoInput;

