import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom'

class CreateClass extends React.Component {

    state={
        style: null,
        level: null,
        description: null,
        date: null,
        price: null,
        url: null
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler=()=>{
        this.props.createClass(this.state)
    }

    render(){

        return (
            <div className="form-div">
            <Form className="inner-form">
      
      
            <FormGroup >
              <Label for="exampleSelect">Class Style</Label>
              <Input 
                onChange={this.changeHandler} 
                type="select" 
                name="style" 
                id="exampleSelect">
                <option>Cuban Salsa</option>
                <option>New York Salsa</option>
                <option>Bachata</option>
                <option>Kizomba</option>
                <option>Afro Cuban Folklore</option>
              </Input>
            </FormGroup>
      
            <FormGroup>
              <Label for="exampleSelect">Level</Label>
              <Input 
                onChange={this.changeHandler} 
                type="select" 
                name="level" 
                id="exampleSelect">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>All Levels</option>
              </Input>
            </FormGroup>
      
      
            <FormGroup>
              <Label for="exampleText">Class Description</Label>
              <Input 
                onChange={this.changeHandler} 
                value={this.state.description} 
                type="textarea" 
                name="description"
                placeholder="Please write one or two short sentences telling students what they can expect from this class." 
                id="exampleText" />
            </FormGroup>
      
            {/* <FormGroup>
              <Label value={this.state.date} for="exampleDate">Class Date</Label>
              <Input
                onChange={this.changeHandler} 
                type="date"
                name="date"
                id="exampleDate"
                value={this.props.date}
              />
            </FormGroup> */}

            <FormGroup >
              <Label for="example">Price in USD</Label>
              <Input 
                onChange={this.changeHandler} 
                type="number" 
                name="price" 
                value={this.state.price}>
              </Input>
            </FormGroup>
      
      
            <FormGroup>
              <Label for="exampleEmail">Class URL</Label>
              <Input 
                onChange={this.changeHandler} 
                value={this.state.url} 
                type="text" 
                name="url" 
                id="exampleEmail" 
                placeholder="Paste the link to a private YouTube video of your class." />
            </FormGroup>
      
            <Button tag={Link} to="/me/created_classes" block color="primary" 
              onClick={this.submitHandler}>Create Class</Button>
          </Form>
          </div>
        );
    }
  
}

export default CreateClass;