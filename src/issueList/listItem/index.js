import React, {useState} from "react";
import { Modal, Button, Col, Row, Badge } from "react-bootstrap";
// import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import Moment from "react-moment";

function ListItem({ toggleModal, owner, repo, setIssueNumber, show, handleClose, singleIssue, comments }) {
  // each comment
  let [comment, setComment] = useState([]);


  return (
    <div>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        size="xl"
        // isOpen={showModal}
        // contentLabel="Inline Styles Modal Example"
        // onRequestClose={() => setShowModal(false)}
        // shouldCloseOnOverlayClick={true}
        // style={{
        //   overlay: {
        //     backgroundColor: "rgb(238, 238, 238, 0.3)",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   },
        //   content: {
        //     color: "black",
        //     width: "80%",
        //     height: "80%",
        //     position: "relative",
        //   },
        // }}
      >
        <h1>
          <Badge variant="success">{singleIssue.state}</Badge>{" "}
          {singleIssue.title}
        </h1>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>
              Issue #{singleIssue.number} opened{" "}
              <Moment fromNow>{singleIssue.created_at}</Moment>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown>{singleIssue.body}</ReactMarkdown>
          {singleIssue.comments > 0 ? (
            <div>
              <h3>Comments</h3>
              {comments.map((comment) => {
                return (
                  <div>
                    <Row>
                      <Col sm={2}>
                        <img
                          className="user-comment-pic"
                          src={comment.user.avatar_url}
                          alt=""
                        />
                        <p>{comment.user.login}</p>
                      </Col>
                      <Col sm={10}>
                        <ReactMarkdown>{comment.body}</ReactMarkdown>
                        <Moment fromNow>{comment.created_at}</Moment>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>There's no comment </div>
          )}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListItem;
