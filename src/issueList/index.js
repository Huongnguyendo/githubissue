import React, { useState } from "react";
import { Col, Container, Row, Badge } from "react-bootstrap";
import Moment from "react-moment";
import ListItem from "./listItem/index";

function IssueList({ owner, repo, data }) {
  let [singleIssue, setSingleIssue] = useState({});
  let [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [issueNumber, setIssueNumber] = useState(null);

  const toggleModal = async (number) => {
    setIssueNumber(number);
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`;
    const response = await fetch(url);
    const chosenIssueData = await response.json();
    console.log("data", chosenIssueData);
    // assign chosen issue to a variable to get list of comments
    setSingleIssue(chosenIssueData);
    // if there are comments, fetch comments
    if (chosenIssueData.comments > 0) {
      const urlComment = `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments`;
      const responseComment = await fetch(urlComment);
      const dataComment = await responseComment.json();
      setComments(dataComment);
    }
    // setShowModal(true);
  };

  
  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>
        This page is use for getting GitHub issues. <br />
        Please type owner and repo in search box to get issue list related.
        <br />
        Search should be in "owner/repo" format. Enjoy! *^^*
      </div>
    );
  }

  return (
    <div>
      {data.map((issue) => {
        return (
          <Container
            className="issue"
            style={{ width: "100vw", height: "170px" }}
          >
            <Row>
              <Col sm={2}>
                <div className="user">
                  <img
                    className="user-img"
                    src={issue.user.avatar_url}
                    alt=""
                  />
                  <p>{issue.user.login}</p>
                  <div style={{ fontSize: "15px" }}>ID:{issue.user.id}</div>
                </div>
              </Col>
              <Col sm={10}>
                <div className="issue-content">
                  <h5>
                    <a
                      href="#"
                      onClick={() => {
                        handleShow();
                        toggleModal(issue.number);
                      }}
                    >
                      {issue.title}
                    </a>
                  </h5>

                  <div>
                    {issue.labels.length > 0
                      ? issue.labels.map((label) => {
                          return (
                            <Badge variant="warning" className="mr-2">
                              {label.name}
                            </Badge>
                          );
                        })
                      : ""}
                  </div>
                  <div style={{ height: "50px", overflow: "hidden" }}>
                    {issue.body}
                  </div>
                  <div>
                    #{issue.number} - opened
                    <Moment fromNow>{issue.created_at}</Moment> - Comment:{" "}
                    {issue.comments}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}
      <ListItem
        toggleModal={toggleModal}
        issueNumber={issueNumber}
        owner={owner}
        repo={repo}
        show={show}
        handleClose={handleClose}
        comments={comments}
        singleIssue={singleIssue}
      />
    </div>
  );
}

export default IssueList;
