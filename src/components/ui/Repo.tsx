import React from "react";

// interface RepoProps {
//   repo: {
//     name: string;
//     description: string;
//     language: string | null;
//   };
// }

type RepoProps = {
  repo: {
    name: string;
    description: string;
    language: string | null;
  };
};

export const Repo: React.FC<RepoProps> = ({ repo }) => {
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
