import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import {
  DatabaseFilled, 
  LogoutOutlined,
  BookFilled,
  HomeFilled,
  StarFilled,
} from "@ant-design/icons";
import { roleRequest } from "../util/LoginManager";
const { Menu } = require("antd");

const UserSideNavigation = () => {
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

  const handleLogoutClick = () => {
    history.push("/login");
  };
  const handleBooksClick = () => {
    history.push("books");
  };

  const handleFavBooksClick = () => {
    history.push("favourites");
  };

  const handleReadBooksClick = () => {
    history.push("readlist");
  };

  var select = match.params.id;
  if (match.params.id == undefined) {
    select = "home";
  }

  if (role == "user") {
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
          <Menu.Item key="favourites" onClick={handleFavBooksClick}>
            <StarFilled />
            <span>Favourites</span>
          </Menu.Item>
          <Menu.Item key="readList" onClick={handleReadBooksClick}>
            <DatabaseFilled />
            <span>Readlist</span>
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

export default UserSideNavigation;
