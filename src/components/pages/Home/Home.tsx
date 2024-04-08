import React, { useState, useEffect, FC } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import "./Home.css";
import { User } from "../../ui/User";
import { fetchUsers } from "../../../api";
import { UsersProps } from "../../../types";

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handlePrevPage = () => {
    setPage((page: number) => (page === 1 ? page : page - 1));
  };

  const handleNextPage = () => {
    if (users.length === 0) {
      return;
    }
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery) {
        const items = await fetchUsers(searchQuery, page, limit);
        setUsers(items);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page, limit]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setSearchQuery(data.query);
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
