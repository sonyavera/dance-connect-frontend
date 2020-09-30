import React from 'react'
import '../App.css'
import {Col, Row} from 'reactstrap'


class Comment extends React.Component{

    render(){
        console.log("this.props in commenT", this.props)

        return(
            <>
            <Row className="border border-dark comment-row">

                <Col xs="2">
                    Name
                </Col>
                <Col>
                    {this.props.body}
                </Col>

            </Row>
            </>
        )
    }
}

export default Comment;