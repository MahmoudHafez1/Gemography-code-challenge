import React from "react";
import Repo from "../Repo/Repo";

const RepoList = (props) => {
  return (
    <div>
      {props.repos.map((repo) => (
        <Repo
          key={repo.id}
          avatarUrl={repo.owner.avatar_url}
          title={repo.name}
          desc={repo.description}
          owner={repo.owner.login}
          date={repo.pushed_at}
          stars={repo.stargazers_count}
          issues={repo.open_issues_count}
          ownerUrl={repo.owner.html_url}
        />
      ))}
    </div>
  );
};

export default React.memo(RepoList);
