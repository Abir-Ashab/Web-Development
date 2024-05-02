import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faBriefcase, faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
        {/* Search bar */}
        <input type="text" placeholder="Search" className="px-4 py-2 rounded-md bg-gray-700 text-white" />

        {/* Icons */}
        <div className="flex space-x-4">
          {/* Home Icon */}
          <Link to="/">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>

          {/* People Icon */}
          <Link to="/people">
            <FontAwesomeIcon icon={faUserFriends} size="lg" />
          </Link>

          {/* Jobs Icon */}
          <Link to="/jobs">
            <FontAwesomeIcon icon={faBriefcase} size="lg" />
          </Link>

          {/* Message Icon */}
          <Link to="/messages">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </Link>

          {/* Notification Icon */}
          <Link to="/notifications">
            <FontAwesomeIcon icon={faBell} size="lg" />
          </Link>
        </div>
      </nav>

      {/* Other content of the dashboard */}
      {/* Add your dashboard content here */}
    </div>
  );
}

export default Dashboard;
