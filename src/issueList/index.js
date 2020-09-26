import React, { useState } from "react";
import ListItem from "./listItem/index";

function IssueList({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <ListItem show={show} onHide={handleClose} handleClose={handleClose} />
      <div>
        {data.map((item) => (
          <div onClick={handleShow}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}

export default IssueList;
