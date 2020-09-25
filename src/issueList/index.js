import React, { useState } from "react";
import ListItem from "./listItem/index";

function IssueList({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!data) {
    return <></>;
  }
  return (
    <div>
      <ListItem show={show} onHide={handleClose} handleClose={handleClose} />
      <ol>
        {data.map((item) => (
          <li onClick={handleShow}>{item.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default IssueList;
