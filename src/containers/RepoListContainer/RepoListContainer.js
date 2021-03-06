import React, { useState, useEffect, useCallback, Fragment } from "react";
import RepoList from "../../components/RepoList/RepoList";
import classes from "./RepoListContainer.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setError("Unable to load Repositories");
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
        <div className={classes.Loader}>
          <Loader
            type="ThreeDots"
            color="#000"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : !error ? (
        <RepoList repos={repos} />
      ) : (
        <div className={classes.Error}>{error}</div>
      )}

      <div>
        <button
          onClick={onPrevClickHandler}
          disabled={loading || currentPage === 1}
          className={classes.PaginationBtn}
        >
          Previous
        </button>
        <button
          onClick={onNextClickHandler}
          disabled={loading}
          className={classes.PaginationBtn}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
};

export default RepoListContainer;
