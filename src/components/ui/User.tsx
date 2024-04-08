import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UserProps } from "../../types";

export const User: FC<UserProps> = ({ user }) => {
  const { avatar_url, login, id } = user;
  return (
    <div className="user">
      <div className="image">
        <img src={avatar_url} alt={login} />
      </div>

      <div className="user-info">
        <h3>{login}</h3>
        <small>{id}</small>
        <Link to={`/user/${login}`}>View profile</Link>
      </div>
    </div>
  );
};
