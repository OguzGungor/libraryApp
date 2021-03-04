import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { removeBook } from "../../../util/admin/Books";
import { getBooks } from "../../../util/common/common";
import { addFavBook, addReadBook } from "../../../util/user/Books";

class Books extends React.Component {
  

  addFavHandler = (id) => {
    
    const { history ,match} = this.props;  
    addFavBook(id).then((result)=>{
      alert(result);
    });
  }

  addReadHandler = (id) => {
    
    const { history ,match} = this.props;  
    addReadBook(id).then((result)=>{
        alert(result);
      });
  }



  state = {
    books: [{}],
    isLoading: true,
    error: null,
  };

  columns = [
    {
      title: "image",
      dataIndex: "image",
      render :(image) =><img alt={image} src={image} width ="50"/>      
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "author",
      dataIndex: "author",
    },
    {
      title: "",
      dataIndex: "action",
      render: (id) => (
        <div>
          <Button id={id} onClick={this.addFavHandler.bind(this, id)}>
            Add to Favourites
          </Button>
          <Button id={id} onClick={this.addReadHandler.bind(this, id)}>
            Add to ReadList
          </Button>
        </div>
      ),
    },
  ];

  componentDidMount() {
    getBooks()
      .then((users) => {
        let data = [];

        users.map((user, index) => {
          data.push({
            key: user.id,
            name: user.name,
            author: user.author,
            image : (user.image != "null") ? (user.image):("data:image/png;base64,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"),
            action: user.id,
          });
          return data;
        });
        this.setState({
          books: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  search() {
    getBooks(document.getElementById("searchBox").value)
      .then((users) => {
        let data = [];

        users.map((user, index) => {
          data.push({
            key: user.id,
            id: user.id,
            name: user.name,
            author: user.author,
            image : (user.image != "null") ? (user.image):("data:image/png;base64,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"),
            action: user.id,
          });
          return data;
        });
        this.setState({
          books: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, books, error } = this.state;

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
                placeholder = "Search"
                onChange={this.search.bind(this)}
              />
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Title level={2}>UserList</Title>
                </Col>
              </Row>
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Table columns={this.columns} dataSource={books} />
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

export default withRouter(Books);