import React, { useState, useEffect } from "react";
import RepoList from "../../components/RepoList/RepoList";

const RepoListContainer = () => {
  const [request, setRequest] = useState(false);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [count, setCount] = useState();

  const fetchPage = (pageNumber) => {
    setRequest(true);
    fetch(
      `https://api.github.com/search/repositories?q=created:>2021-07-22&sort=stars&order=desc&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then(async (results) => {
        await setRepos(pageNumber);
        await setCurrentPage(0);
        setRequest(false);
      });
  };

  useEffect(() => {
    setRequest(true);
    fetch(
      `https://api.github.com/search/repositories?q=created:>2021-07-22&sort=stars&order=desc`
    )
      .then((res) => res.json())
      .then(async (results) => {
        await setRepos(results.items);
        await setCount(results.total_count);
        await setCurrentPage(0);
        setRequest(false);
      });
  }, []);
  //console.log(repos);
  return <RepoList repos={repos} />;
};

export default RepoListContainer;
