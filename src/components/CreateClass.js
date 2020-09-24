import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class CreateClass extends React.Component {

    state={
        style: null,
        level: null,
        description: null,
        date: null,
        url: null
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value}, ()=> console.log("this.state", this.state))
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
              <Input onChange={this.changeHandler} type="select" name="style" id="exampleSelect">
                <option>Cuban Salsa</option>
                <option>New York Salsa</option>
                <option>Bachata</option>
                <option>Kizomba</option>
                <option>Afro Cuban Folklore</option>
              </Input>
            </FormGroup>
      
            <FormGroup>
              <Label for="exampleSelect">Level</Label>
              <Input onChange={this.changeHandler} type="select" name="level" id="exampleSelect">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>All Levels</option>
              </Input>
            </FormGroup>
      
      
            <FormGroup>
              <Label for="exampleText">Class Description</Label>
              <Input onChange={this.changeHandler} value={this.state.description} type="textarea" name="description" id="exampleText" />
            </FormGroup>
      
            <FormGroup>
              <Label value={this.state.date} for="exampleDate">Class Date</Label>
              <Input
                onChange={this.changeHandler} 
                type="date"
                name="date"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </FormGroup>
      
            <FormGroup>
              <Label for="exampleEmail">Class URL</Label>
              <Input onChange={this.changeHandler} value={this.state.url} type="text" name="url" id="exampleEmail" placeholder="add the link to a private YouTube video with your class" />
            </FormGroup>
      
            <Button block color="primary" onClick={this.submitHandler}>Create Class</Button>
          </Form>
          </div>
        );
    }
  
}

export default CreateClass;