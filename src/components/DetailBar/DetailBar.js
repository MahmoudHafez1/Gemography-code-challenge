import classes from "./DetailBar.module.css";
import React from "react";

const DetailBar = (props) => {
  const diff_in_days = (date1, date2) => {
    const diffInTime = date1.getTime() - date2.getTime();
    return Math.floor(diffInTime / (1000 * 3600 * 24));
  };

  const stars =
    props.stars > 1000
      ? `${Math.floor(props.stars / 100) / 10} K`
      : props.stars;
  const issues =
    props.issues > 1000
      ? `${Math.floor(props.issues / 100) / 10} K`
      : props.issues;
  const timeInterval = diff_in_days(
    new Date(),
    new Date(props.date.slice(0, 10))
  );

  const timeIntervalAndOwnerText = `Submitted ${
    timeInterval === 0
      ? "Today"
      : timeInterval === 1
      ? "Yesterday"
      : `${timeInterval} days ago`
  } by `;

  return (
    <div className={classes.DetailBar}>
      <div className={classes.Stars}>Stars: {stars}</div>
      <div className={classes.Issues}>Issues: {issues}</div>
      <div className={classes.timeIntervalAndOwner}>
        <p>
          {timeIntervalAndOwnerText} <a href={props.ownerUrl}>{props.owner}</a>
        </p>
      </div>
    </div>
  );
};

export default DetailBar;
