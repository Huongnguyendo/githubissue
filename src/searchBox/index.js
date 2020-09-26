import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function SearchBox({ setKeyword, handleSubmit }) {
  return (
    <div>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="../logo2.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          AnotherGitHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form
            inline
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
          >
            <FormControl
              type="text"
              placeholder="Try facebook/react"
              className="mr-sm-2"
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default SearchBox;
