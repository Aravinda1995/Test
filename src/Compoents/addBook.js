import React, { Component } from 'react';
import './components.css'
import {Input, Button, Form, Col, Container, Row, InputGroup, InputGroupAddon, FormGroup} from 'reactstrap';


export default class addBook extends Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            isbn: '',
            author: '',
            price: 0,
            yearOfPublication: 0,
            publisher: ''
        };
    }

    redirectToAddBook = () => {
        this.props.history.push('/addBook');
    };

    redirectToViewBook =() => {
        this.props.history.push('/viewBook');
    };


    addBook = () => {
        console.log("AWA");
      if(this.state.name === "" || this.state.isbn === "" || this.state.author === "" || this.state.price === "") {
          alert("Some fields are empty, Please fill all the fields");
      } else {
          let price = Number(this.state.price);
          let yearOfPublish = Number(this.state.yearOfPublication);
          console.log("AWA1");
          if(price.isNaN || yearOfPublish.isNaN){
              alert("Please enter numbers to price and year of publish")
          } else {
              console.log("AWA3");
              fetch("http://localhost:3001/books", {
                  method: 'POST',
                  body: JSON.stringify({
                      name: this.state.name,
                      isbn: this.state.isbn,
                      author: this.state.author,
                      price: price,
                      yearOfPublication: yearOfPublish,
                      publisher: this.state.publisher
                  }),
                  headers:{'Content-Type': 'application/json'}
              }).then(result => {
                    if(result.ok){
                        alert("Book added successfully");
                    } else {
                        alert("The book can't be added");
                    }
              }).catch(err => {
                  alert(JSON.parse(err.error));
              });
          }
      }
    };

    render() {
        return (
            <div>
                <div>
                    <Container className={"Container"}>
                        <Form>
                            <FormGroup>
                                <Button color="primary" onClick={this.redirectToAddBook}>Add New Books</Button>{'    '}
                                <Button color="info" onClick={this.redirectToViewBook}>View Books</Button>{'    '}
                                <Button color="info">Calculate Price of Books</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
                <Container className={"Container"}>
                    <h1>Add Book</h1>
                    <Form>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"Book Name"} name="name" onChange = {(e) => this.setState({name:e.target.value})}/></Col>
                        </Row>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"ISBN Number"} name="isbn" onChange = {(e) => this.setState({isbn:e.target.value})}/></Col>
                        </Row>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"Author Name"} name="author" onChange = {(e) => this.setState({author:e.target.value})}/></Col>
                        </Row>
                        <Row className={"Row"}>
                            <Col>
                                <InputGroup>
                                    <Input type="text" placeholder={"Price"} name="price" onChange = {(e) => this.setState({price:e.target.value})}/>
                                    <InputGroupAddon addonType="append">LKR</InputGroupAddon>
                                </InputGroup>
                            </Col>
                            <Col><Input type="text" placeholder={"Year Of Publish"} name="yearOfPublication" onChange = {(e) => this.setState({yearOfPublication:e.target.value})}/></Col>
                        </Row>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"Publisher Name"} name="publisher" onChange = {(e) => this.setState({publisher:e.target.value})}/></Col>
                        </Row>
                        <Button color="primary" onClick={this.addBook}>Add Book</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}