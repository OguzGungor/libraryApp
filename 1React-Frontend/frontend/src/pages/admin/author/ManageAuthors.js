import React from "react";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { getAuthors } from "../../../util/common/common";

class ManageAuthors extends React.Component {
  state = {
    authors: [{}],
    isLoading: true,
    error: null,
  };

  columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "book",
      dataIndex: "book",
    },
  ];
  
  componentDidMount() {
    getAuthors()
      .then((author) => {
        let data = [];

        author.map((user, index) => {
          data.push({
            key: user.id,
            id: user.id,
            name: user.name,
            book: user.book,
          });
          return data;
        });
        this.setState({
          authors: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  search() {
    getAuthors(document.getElementById("searchBox").value)
      .then((author) => {
        let data = [];

        author.map((user, index) => {
          data.push({
            key: user.id,
            id: user.id,
            name: user.name,
            book: user.book,
          });
          return data;
        });
        this.setState({
          authors: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, authors, error } = this.state;

    return (
      <React.Fragment>
        {!isLoading ? (
          error ? (
            `An error occured : ${error}`
          ) : (
            <>
              <Input
                id="searchBox"
                type="text"
                onChange={this.search.bind(this)}
              />
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Title level={2}>UserList</Title>
                </Col>
              </Row>
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Table columns={this.columns} dataSource={authors} />
                </Col>
              </Row>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

export default ManageAuthors;
