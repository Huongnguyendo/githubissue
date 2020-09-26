import React, { useState } from "react";
import { Col, Container, Row, Badge } from "react-bootstrap";
import Moment from "react-moment";
import ListItem from "./listItem/index";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function IssueList({ data, owner, repo }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // chosen issue ID when clicked
  let [issueID, setIssueID] = useState(null);
  //  chosen issue
  let [singleIssue, setSingleIssue] = useState({});
  // set open-close state of modal
  let [showModal, setShowModal] = useState(false);
  // list of all comments
  let [comments, setComments] = useState([]);
  // each comment
  let [comment, setComment] = useState([]);


  const toggleModal = async (id) => {
    setIssueID(id);
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    
    setSingleIssue(data);
    console.log("comments number", singleIssue.comments);
    if (data.comments > 0) {
      const urlComment = `https://api.github.com/repos/${owner}/${repo}/issues/${id}/comments`;
      const responseComment = await fetch(urlComment);
      const dataComment = await responseComment.json();
      setComments(dataComment);
    }
    setShowModal(true);

    // if(showModal) {
    //   <ListItem owner={owner} repo={repo} id={id} showModal={showModal}/>
    // }
    
  };


  if (!data) {
    return <></>;
  }

  return ( 
    data.map((issue) => {
    return (
      <Container className="issue">
        {console.log("issue: ", issue)}
        <Row>
          <Col sm={4}>
            <div className="user">
              <img className="user-img" src={issue.user.avatar_url} />
              <p>{issue.user.login}</p>
              <p>ID: {issue.user.id}</p>
            </div>
          </Col>
          <Col sm={8}>
            <div className="issue-content">
              <h2>
                <a href="#" > 
                {/* onClick={()=> toggleModal(issue.number)} */}
                   {issue.title} 
                </a>
              </h2>
              
              <div>
                {issue.labels.length > 0 ? 
                  issue.labels.map((label) => {return (
                    <Badge variant="warning" className="mr-2">{label.name}</Badge>
                  )}) : ""}
              </div>
              <div>
                <ReactMarkdown
                 source={issue.body} />
              </div>
              <div>#{issue.number} opened <Moment fromNow>{issue.created_at}</Moment></div>
            </div>
          </Col>
        </Row>
      </Container>
    );
    })
    

  )

}

export default IssueList;
