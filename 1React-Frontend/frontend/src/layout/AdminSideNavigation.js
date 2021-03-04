import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { UserOutlined, LogoutOutlined ,BookFilled,HomeFilled ,EditFilled } from "@ant-design/icons";
import { roleRequest } from "../util/LoginManager";
const { Menu } = require("antd");

const AdminSideNavigation = () => {
  const [role, setRole] = useState();

  useEffect(() => {
    roleRequest().then((result) => {
      setRole(result);
    });
  }, []);

  let match = useRouteMatch();

  let location = useLocation();

  const history = useHistory();

  const handleHomeClick = () => {
    history.push(`home`);
  };

  const handleBooksClick = () => {
    history.push(`books`);
  };

  const handleUsersClick = () => {
    history.push(`users`);
  };

  const handleAuthorsClick = () => {
    history.push(`authors`);
  };

  const handleLogoutClick = () => {
    history.push("/login");
  };

  var select = match.params.id;
  if (match.params.id == undefined) {
    select = "home";
  }

  if (role == "admin") {
    return (
      <div>
        <div
          style={{
            height: "32px",
            background: "rgba(255,255,255,0.2",
            margin: "16px",
          }}
        ></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${select}`]}>
          <Menu.Item key="home" onClick={handleHomeClick}>
          <HomeFilled />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="books" onClick={handleBooksClick}>
          <BookFilled />
            <span>Books</span>
          </Menu.Item>
          <Menu.Item key="authors" onClick={handleAuthorsClick}>
          <EditFilled />
            <span>Authors</span>
          </Menu.Item>
          <Menu.Item key="users" onClick={handleUsersClick}>
            <UserOutlined />
            <span>Users</span>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogoutClick}>
          <LogoutOutlined />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  } else {
    return <></>;
  }
};

export default AdminSideNavigation;
