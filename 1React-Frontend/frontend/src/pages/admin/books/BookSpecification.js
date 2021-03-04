import React, { useState, useEffect } from "react";
import { Form, Input, Button, Cascader, Radio } from "antd";
import { useHistory } from "react-router-dom";
import { addBook } from "../../../util/admin/Books";
import { getBook } from "../../../util/common/common";
import { roleRequest } from "../../../util/LoginManager";

const BookSpecification = () => {
  const history = useHistory();

  const [id, setID] = useState();
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [image , setImage] = useState();

  useEffect(() => {
    var items = window.location.search.substr(1).split("=");
    if (items.length >= 2) {
      getBook(items[1]).then((result) => {
        setID(items[1]);
        setName(result.name);
        setAuthor(result.authors[0].name);
        setImage(result.image);
      });
    }
  }, []);

  const add = (values) => {
    if (id) {
      values["id"] = id;
    }
    addBook(values).then((result) => {
      history.push("/admin/books");
    });
  };

  if (id) {
    return (
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={add}
        >
          <Form.Item name="currentname" label="current Name">
            <h1>{name}</h1>
          </Form.Item>
          <Form.Item name="currentAuthor" label="current Author">
            <h1>{author}</h1>
          </Form.Item>
          <Form.Item name="currentImage" label="current Image">
          <img alt={image} src={image} width ="50"/> 
          </Form.Item>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Input />
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={add}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="ImageURL">
            <Input />
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
};

export default BookSpecification;
