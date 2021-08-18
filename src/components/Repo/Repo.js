import React from "react";

const Repo = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <img src={props.imageUrl} />
      <p>{props.owner}</p>
    </div>
  );
};

export default Repo;
