// import React, { useState } from "react";
// import Pagination from "react-bootstrap/Pagination";

// const PageNavigation = ({ totalPage, getIssues }) => {
//   let [activePage, setActivePage] = useState(1);
//   return (
//     <div>
//       <Pagination>
//         <Pagination.Prev
//           onClick={(activePage) => {
//             let newActivePage = activePage--;
//             setActivePage(newActivePage);
//             getIssues(newActivePage);
//           }}
//         />
//         <Pagination.Item
//           active
//           onClick={() => {
//             getIssues(1);
//             setActivePage(1);
//           }}
//         >
//           {1}
//         </Pagination.Item>
//         <Pagination.Ellipsis
//           onClick={(activePage) => {
//             let newActivePage = activePage--;
//             setActivePage(newActivePage);
//             getIssues(newActivePage);
//           }}
//         />
//         <Pagination.Item
//           onClick={() => {
//             getIssues(12);
//             setActivePage(12);
//           }}
//         >
//           {12}
//         </Pagination.Item>
//         <Pagination.Ellipsis
//           onClick={(activePage) => {
//             let newActivePage = activePage++;
//             setActivePage(newActivePage);
//             getIssues(newActivePage);
//           }}
//         />
//         <Pagination.Item
//           onClick={() => {
//             getIssues(totalPage);
//             setActivePage(totalPage);
//           }}
//         >
//           {totalPage}
//         </Pagination.Item>
//         <Pagination.Next
//           onClick={(activePage) => {
//             let newActivePage = activePage++;
//             setActivePage(newActivePage);
//             getIssues(newActivePage);
//           }}
//         />
//       </Pagination>
//     </div>
//   );
// };

// export default PageNavigation;
