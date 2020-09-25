import React, { useState, useEffect } from "react";
import IssueList from "./issueList/index";
import Pagination from "./pagination/index";
import SearchBox from "./searchBox/index";
import { Alert } from "react-bootstrap";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
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
		// getIssues();
	};

	const getOwnerRepo = (value) => {
		let owner = value.split("/")[0];
		let repo = value.split("/")[1];
		return { owner, repo };
		// if value and key name are same, we can write as above
	};

	const getIssues = async () => {
		try {
			setLoading(true);
			let url = `https://api.github.com/repos/${owner}/${repo}/issues`;
			let response = await fetch(url);
			if (response.status == 200) {
				let data = await response.json();
				console.log("data", data);
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
		getIssues();
		getComment();
	}, [owner, repo]);

	return (
		<div>
			<SearchBox setKeyword={setKeyword} handleSubmit={handleSubmit} />
			{error && <Alert variant={"danger"}>{error}</Alert>}
			<BarLoader
				css={override}
				size={150}
				color={"#123abc"}
				loading={loading}
			/>
			<IssueList />
			<Pagination />
		</div>
	);
}

export default App;
