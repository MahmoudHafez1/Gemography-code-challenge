import React from "react";
import DetailBar from "../DetailBar/DetailBar";
import classes from "./Repo.module.css";

const Repo = (props) => {
  console.log("aa");
  return (
    <div className={classes.RepoContainer}>
      <img
        src={props.avatarUrl}
        alt={`${props.owner} avatar`}
        className={classes.Avatar}
      />

      <div className={classes.Info}>
        <h2 className={classes.title}>{props.title}</h2>
        <p>{props.desc}</p>
        <DetailBar
          stars={props.stars}
          issues={props.issues}
          date={props.date}
          owner={props.owner}
          ownerUrl={props.ownerUrl}
        />
      </div>
    </div>
  );
};

export default Repo;
