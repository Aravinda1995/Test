import React, { Component } from 'react';
import './components.css'
import {Input, Button, Form, Container, Row, Col, Table, FormGroup} from 'reactstrap';


export default class viewBooks extends Component {

    constructor(props) {
        super(props);
        this.state ={
            authorName: '',
            authors: [],
            books: []
        };
    }

    componentDidMount() {
       this.getAuthors();
       this.getBooks();
    }

    redirectToAddBook = () => {
        this.props.history.push('/addBook');
    };

    redirectToViewBook =() => {
        this.props.history.push('/viewBook');
    };


    getAuthors = () => {
      var allAuthors = []
      fetch("http://localhost:3001/authors").then(res => {
          if(res.ok){
              return res.json();
          } else {
              alert("Authors not Found");
          }
      }).then(data => {
          data.map((item, i) => {
              return allAuthors.push({aName : item.firstName.concat(" ", item.lastName)})
          });
          this.setState({authors: allAuthors})
      }).catch(err => {
         console.log(err)
      });
    };

     getBooks = () => {
        let allBooks = [];
        fetch("http://localhost:3001/books").then(res =>{
            if(res.ok){
                return res.json();
            } else {
                alert("Error when obtaining books")
            }
        }).then(data => {
            data.map((item) =>{
                return allBooks.push({bookName: item.name, author: item.author, price: item.price, yearOfPub: item.yearOfPublication, publisher: item.publisher})
            });
            this.setState({books: allBooks})
        }).catch(err => {
            console.log(err)
        })
     };

     getBooksByAuthor = (authorName) => {
       let allBooks = [];
       if(authorName === "Show books of all the authors"){
           this.getBooks();
       } else {
           fetch("http://localhost:3001/books/"+ authorName).then(res => {
               if(res.ok){
                   return res.json();
               } else {
                   alert("Error when obtaining books")
               }
           }).then(data => {
               data.map((item) =>{
                   return allBooks.push({bookName: item.name, author: item.author, price: item.price, yearOfPub: item.yearOfPublication, publisher: item.publisher})
               });
               this.setState({books: allBooks})
           }).catch(err => {
               console.log(err)
           })
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
                    <h1>Books</h1>
                    <Form>
                        <Row className={"Row"}>
                            <Col>
                                <Input type="select" name="select"  onChange = {(e) => this.getBooksByAuthor(e.target.value)} >
                                    <option>Show books of all the authors</option>
                                    {this.state.authors.map((author) => {
                                        return <option>
                                            {author.aName}
                                        </option>
                                    })}
                                </Input>
                            </Col>
                            <Col>
                                <Button color="primary">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Container>
                    <Table dark>
                        <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Year Of Publication</th>
                            <th>Publisher</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map((book) => {
                                return <tr>
                                    <td>{book.bookName}</td>
                                    <td>{book.author}</td>
                                    <td>{book.price}</td>
                                    <td>{book.yearOfPub}</td>
                                    <td>{book.publisher}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
