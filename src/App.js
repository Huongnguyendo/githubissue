import React, { useState, useEffect } from "react";
import IssueList from "./issueList/index";
import SearchBox from "./searchBox/index";
// import PageNavigation from "./pageNavigation/index";
import { Alert, Badge, Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import Pagination from "react-js-pagination";
import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./App.css";

const override = css`
  display: block;
  margin: 30px auto;
  border-color: blue;
`;
function App() {
  let [keyword, setKeyword] = useState("");
  let [error, setError] = useState(null);
  let [repo, setRepo] = useState("");
  let [owner, setOwner] = useState("");
  let [loading, setLoading] = useState(false);
  let [totalPage, setTotalPage] = useState();
  let [data, setData] = useState();
  let [page, setPage] = useState();
  let [issueNumber, setIssueNumber] = useState(null);
  let [singleIssue, setSingleIssue] = useState({});
  // set open-close state of modal
  let [showModal, setShowModal] = useState(false);
  // list of all comments
  let [comments, setComments] = useState([]);
  // each comment
  let [comment, setComment] = useState([]);

  const handleSubmit = () => {
    let { owner, repo } = getOwnerRepo(keyword);
    console.log({ owner, repo });
    if (!owner || !repo) {
      setError("you need proper keyword");
      return;
    }
    setOwner(owner);
    setRepo(repo);
    setError(null);
  };

  const getOwnerRepo = (value) => {
    let owner = value.split("/")[0];
    let repo = value.split("/")[1];
    return { owner, repo };
    // if value and key name are same, we can write as above
  };

  const getIssues = async (page) => {
    try {
      setLoading(true);
      let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=10`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      console.log("data", data);
      const link = response.headers.get("link");
      if (link) {
        console.log(link);
        const getTotalPage = link.match(/page=(\d+)>; rel="last"/); // \d represent number + mean one to many
        if (getTotalPage) {
          setTotalPage(parseInt(getTotalPage[1]));
        }
      } else {
        setError(`API has some problem, error code : ${response.status}`);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // const getComment = async () => {
  //   const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   // console.log("data comm", data[0].comments_url);
  //   const commentURL = data[0].comments_url;
  //   console.log("comment url", commentURL);
  //   const commentResponse = await fetch(commentURL);
  //   const commentData = await commentResponse.json();
  //   console.log("comment data man", commentData);
  //   console.log("comment data choise", commentData[1]);
  // };

  const toggleModal = async (number) => {
    setIssueNumber(number);
    // fetch chosen issue 
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    console.log("data.comments", data.comments);
    // assign chosen issue to a variable to get list of comments 
    setSingleIssue(data);
    console.log("comments number", singleIssue.comments);
    // if there are comments, fetch comments
    if (data.comments > 0) {
      const urlComment = `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments`;
      const responseComment = await fetch(urlComment);
      const dataComment = await responseComment.json();
      setComments(dataComment);
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (!owner || !repo) {
      return;
    }
    getIssues(1);
    // getComment();
  }, [owner, repo]);

  return (
    <div>
      <SearchBox
        setKeyword={setKeyword}
        handleSubmit={handleSubmit}
        getIssues={getIssues}
      />
      {error && <Alert variant={"danger"}>{error}</Alert>}
      <BarLoader
        css={override}
        size={150}
        color={"#123abc"}
        loading={loading}
      />
      <div>
        <IssueList data={data} repo={repo} owner={owner} toggleModal={toggleModal}/>
      </div>

      <ReactModal
        closeTimeoutMS={200}
        isOpen={showModal}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgb(238, 238, 238, 0.3)", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          },
          content: {
            color: "black",
            width: "80%",
            height: "80%",
            position: "relative"
          }
        }}
      >
        <h1>
        <Badge variant="success">{singleIssue.state}</Badge>
          {" "} {singleIssue.title}  
        </h1>

        <p>Issue #{singleIssue.number} opened {" "}
          <Moment fromNow>{singleIssue.created_at}</Moment>
        </p>
        
        {singleIssue.comments > 0 ? (
          <div>
            <h3 style={{ marginTop: 20, marginBottom: 20 }}>Comments</h3>
            {comments.map(comment => {
              return (
                <div>
                  <Row>
                    <Col sm={3}>
                      <img className="user-comment-pic" src={comment.user.avatar_url} />
                      <p>{comment.user.login}</p>
                    </Col>
                    <Col sm={9}>
                      <ReactMarkdown>
                        {comment.body}
                      </ReactMarkdown>
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

      </ReactModal>
    
      {totalPage && (
        <div>
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={500}
            pageRangeDisplayed={5}
            onChange={(clickedPage) => {
              setPage(clickedPage);
              getIssues(clickedPage);
            }}
          />
        </div>
        // <PageNavigation totalPage={totalPage} getIssues={getIssues} />
      )}
    </div>
  );
}

export default App;
