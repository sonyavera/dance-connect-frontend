import React from 'react'
import '../App.css'
import Comment from '../components/Comment'
import {Col, Row} from 'reactstrap'


class Comments extends React.Component{



    renderComments=()=>{
        return this.props.comments.map(comment =>{
            return <Comment key={comment.id} body={comment.body}/>
        })
    }

    render(){
        console.log("this.props in comments", this.props)

        return(
            <>
            <div id="comments-div">
            

            {this.props.comments ? 

                
                this.renderComments()
                
                :
                
                <h1>Loading...</h1>}
            

  
            </div>
            </>
        )
    }
}

export default Comments;