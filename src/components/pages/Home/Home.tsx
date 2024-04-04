/* import React, { useState } from "react";
import "./Home.css";
import { User } from "../../ui/User";
import { fetchUsers } from "../../../api";

interface HomeProps {}
interface UsersProps {
  avatar_url: string;
  login: string;
  id: number;
}

export const Home: React.FC<HomeProps> = () => {
  const [query, setQuery] = useState<string>("");
  //users Fetched from API
  const [users, setUsers] = useState<UsersProps[]>([]);
  //Page
  const [page, setPage] = useState<number>(1);
  //Per page
  const [limit, setLimit] = useState<number>(10);

  const handleQueryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // console.log(e.target.value);
  };

  const handlePrevPage = () => {
    setPage((page: number) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const handleSearchUsers = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers(query, page, limit);
      console.log(items);
      setUsers(items);
    } else {
      console.log("Your query is empty ...");
    }
  };

  return (
    <div className="container">
      <div className="search-form">
        <h2>GitHub Search User</h2>
        <form action="">
          <input value={query} onChange={handleQueryInput} type="text" />
          <button onClick={handleSearchUsers}>Search</button>
        </form>
      </div>
      <div className="search-result">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
    </div>
  );
}; */

import React, { useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import "./Home.css";
import { User } from "../../ui/User";
import { fetchUsers } from "../../../api";

interface HomeProps {}
interface UsersProps {
  avatar_url: string;
  login: string;
  id: number;
}
// interface FieldValues {
//   query: string;
// }

export const Home: React.FC<HomeProps> = () => {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const handlePrevPage = () => {
    setPage((page: number) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const query = data.query;
    if (query) {
      const items = await fetchUsers(query, page, limit);
      setUsers(items);
    } else {
      console.log("Your query is empty ...");
    }
  };

  return (
    <div className="container">
      <div className="search-form">
        <h2>GitHub Search User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("query")} type="text" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="search-result">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
    </div>
  );
};
