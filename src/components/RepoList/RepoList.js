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
        date={repo.pushed_at}
        stars={repo.stargazers_count}
        issues={repo.open_issues_count}
      />
    ))}
  </div>
);

export default RepoList;
