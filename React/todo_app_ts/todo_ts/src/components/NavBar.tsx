// Navbar.tsx
import React from 'react';
import { Menu, Badge } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

interface NavBarProps {
  setActivePage: (page: string) => void;
  deletedCount?: number;
  upcomingCount?: number;
}

function NavBar({ setActivePage, deletedCount = 0, upcomingCount = 0 }: NavBarProps) {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="upcoming" onClick={() => setActivePage('upcoming')}>
        Upcoming Todos
        {upcomingCount > 0 && (
          <Badge count={upcomingCount} overflowCount={99} className="badge">
            <CalendarOutlined />
          </Badge>
        )}
      </Menu.Item>
      <Menu.Item key="done" onClick={() => setActivePage('done')}>
        Done Todos
        <CheckCircleOutlined />
      </Menu.Item>
      <Menu.Item key="deleted" onClick={() => setActivePage('deleted')}>
        Deleted Todos
        {deletedCount > 0 && (
          <Badge count={deletedCount} overflowCount={99} className="badge">
            <DeleteOutlined />
          </Badge>
        )}
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
