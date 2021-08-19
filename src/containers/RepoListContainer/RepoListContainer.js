import React, { useState, useEffect, useCallback, Fragment } from "react";
import RepoList from "../../components/RepoList/RepoList";
import classes from "./RepoListContainer.module.css";

const formatDate = (d) => {
  let month = "" + d.getMonth();
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const currentDate = formatDate(new Date());

const RepoListContainer = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [count, setCount] = useState();
  const [error, setError] = useState();

  const fetchPage = useCallback((pageNumber = 1) => {
    setLoading(true);
    setError(false);

    fetch(
      `https://api.github.com/search/repositories?q=created:>${currentDate}&sort=stars&order=desc&page=${pageNumber}`
    )
      .then((res) => {
        if (!res.ok) throw Error();
        return res.json();
      })
      .then((results) => {
        setRepos(results.items);
        setCurrentPage(pageNumber);
        setCount(results.total_count);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to load more Repositories");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const onPrevClickHandler = () => {
    fetchPage(currentPage - 1);
  };

  const onNextClickHandler = () => {
    fetchPage(currentPage + 1);
  };

  return (
    <Fragment>
      {loading ? (
        <div>...Loading</div>
      ) : !error ? (
        <RepoList repos={repos} />
      ) : (
        <div>{error}</div>
      )}

      <div className={classes.Pagination}>
        <button
          onClick={onPrevClickHandler}
          disabled={loading || currentPage === 1}
        >
          prev
        </button>
        <button onClick={onNextClickHandler} disabled={loading}>
          next
        </button>
      </div>
    </Fragment>
  );
};

export default RepoListContainer;
