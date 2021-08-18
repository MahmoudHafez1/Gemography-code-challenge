import React from "react";
import Repo from "../Repo/Repo";

const RepoList = (props) => (
  <div>
    {props.repos.map((repo) => (
      <Repo
        key={repo.id}
        imageUrl={repo.owner.avatar_url}
        title={repo.name}
        desc={repo.description}
        owner={repo.owner.login}
      />
    ))}
  </div>
);

export default RepoList;
