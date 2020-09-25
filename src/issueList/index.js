import React from "react";

function IssueList({ data }) {
  if (!data) {
    return <></>;
  }
  return (
    <div>
      <ol>
        {data.map((item) => (
          <li>{item.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default IssueList;
