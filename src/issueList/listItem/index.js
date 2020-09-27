import React, {useState} from "react";
import { Modal, Button, Col, Row, Badge, Image } from "react-bootstrap";

// import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import Moment from "react-moment";
import "../../App.css";


function ListItem({
  show,
  handleClose,
  singleIssue,
  comments,
  loadMoreComments,
}) {let [comment, setComment] = useState([]);

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
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>
              <Badge variant="success">{singleIssue.state}</Badge>{" "}
              {singleIssue.title}
            </h4>
            <div>
              Issue #{singleIssue.number} opened{" "}
              <Moment fromNow>{singleIssue.created_at}</Moment>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown className="markdown">{singleIssue.body}</ReactMarkdown>
          {singleIssue.comments > 0 ? (
            <div className="commentPart">
              <h3>Comments</h3>
              {comments.map((comment) => {
                return (
                  <div
                    style={{
                      margin: "10px",
                      fontSize: "15px",
                      border: "1px solid #7b7979",
                      borderRadius: "10px",
                      width: "90%",
                      padding: "10px",
                    }}
                  >
                    <Row>
                      <Col sm={3}>
                        <div
                          style={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            roundedCircle
                            className="user-comment-pic"
                            src={comment.user.avatar_url}
                            alt=""
                          />
                          <div
                            style={{ width: "100%", wordWrap: "break-word" }}
                          >
                            {comment.user.login}
                          </div>
                          <div style={{ color: "grey" }}>
                            <Moment fromNow>{comment.created_at}</Moment>
                          </div>
                        </div>
                      </Col>
                      <Col sm={9}>
                        <ReactMarkdown className="markdown">
                          {comment.body}
                        </ReactMarkdown>
                      </Col>
                    </Row>
                  </div>
                );
              })}
              {singleIssue.comments > 5 ? (
                singleIssue.comments - comments.length == 0 ? (
                  "No more comments"
                ) : (
                  <Button onClick={() => loadMoreComments(singleIssue.number)}>
                    Load {singleIssue.comments - comments.length} more
                    comment(s)
                  </Button>
                )
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div>There's no comment </div>
          )}
          
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListItem;
