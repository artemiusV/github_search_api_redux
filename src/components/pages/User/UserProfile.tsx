import React, { FC, useEffect } from "react";
import "./User.css";
import { Repo } from "../../ui/Repo";
import site from "../../../assets/site.png";
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import user from "../../../assets/user.png";
import { Link, useParams } from "react-router-dom";
import { fetchUserData, fetchUserRepos } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchUserInformation } from "../../../store/userSlice/userSlice";
import {
  selectRepos,
  selectUser,
  selectLoading,
} from "../../../store/userSlice/userSelector";
import { toast } from "react-toastify";

export const User: FC = () => {
  const { login } = useParams<{ login: string }>();

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);
  const repos = useAppSelector(selectRepos);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    if (!login) {
      return;
    }
    dispatch(fetchUserInformation(login));
  }, [login]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="user-information">
        <div className="image">
          <img src={userInfo?.avatar_url} />
        </div>
        <div className="user-content">
          <h3>{userInfo?.name}</h3>
          <p>{userInfo?.bio}</p>

          <div className="more-data">
            <p>
              <img src={user} alt="" />
              {userInfo?.followers} Followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <img src={location} alt="" />
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p>
                <img src={site} alt="" />
                {userInfo?.blog}
              </p>
            )}
            <p>
              <img src={github} alt="" />
              <a href={userInfo?.html_url}>View GitHub Profile</a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repos">
        {repos?.length ? (
          repos.map((repo) => <Repo repo={repo} key={repo.id} />)
        ) : (
          <h2>No repos for this user...</h2>
        )}
      </div>
    </div>
  );
};
