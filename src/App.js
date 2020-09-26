import React, { useState, useEffect } from "react";
import IssueList from "./issueList/index";
import SearchBox from "./searchBox/index";
// import PageNavigation from "./pageNavigation/index";
import { Alert } from "react-bootstrap";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import Pagination from "react-js-pagination";
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


  const getComment = async () => {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log("data comm", data[0].comments_url);
    const commentURL = data[0].comments_url;
    console.log("comment url", commentURL);
    const commentResponse = await fetch(commentURL);
    const commentData = await commentResponse.json();
    console.log("comment data man", commentData);
    console.log("comment data choise", commentData[1]);
  };

  useEffect(() => {
    if (!owner || !repo) {
      return;
    }
    getIssues(1);
    getComment();
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
      <IssueList data={data} repo={repo} owner={owner}/>
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
