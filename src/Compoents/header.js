import React, { Component } from 'react';
import './components.css'
import { Button, Form, Container, FormGroup } from 'reactstrap';



export default class header extends Component {

    constructor(props){
        super(props);
    }
    redirectToAddBook = () => {
        this.props.history.push('/addBook');
    };

    redirectToViewBook =() => {
        this.props.history.push('/viewBook');
    };

    render() {
        return (
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
        );
    }
}