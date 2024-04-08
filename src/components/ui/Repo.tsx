import React, { FC } from "react";
import { RepoProps } from "../../types";

export const Repo: FC<RepoProps> = ({ repo }) => {
  const { name, description, language } = repo;
  return (
    <div className="repo">
      <h3>
        <a href="#">{name}</a>
      </h3>
      <p>{description}</p>
      {language && <small>Wrriten in {language}</small>}
    </div>
  );
};
