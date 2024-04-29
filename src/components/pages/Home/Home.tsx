import React, { useState, FC, useEffect } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import { User } from "../../ui/User";
import { fetchUsers } from "../../../api";
import { selectUsersSearch } from "../../../store/userSlice/userSelector";
import { UsersProps } from "../../../types";
import useDebouncedEffect from "../../../useDebounce";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchSearchUsers } from "../../../store/userSlice/searchSlice";

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const usersSearch = useAppSelector(selectUsersSearch);

  console.log(usersSearch);
  const TestNotification = () => {
    const notify = () => {
      toast.success("Тестовое уведомление", {
        // position: (toast as any).POSITION.TOP_RIGHT,
        position: "top-right",
        autoClose: 5000,
      });
    };

    return (
      <div>
        <button onClick={notify}>Показать уведомление</button>
        <ToastContainer />
      </div>
    );
  };

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

  useDebouncedEffect(
    () => {
      dispatch(
        fetchSearchUsers({ searchQuery: getValues().query, page, limit })
      );
    },
    500,
    [getValues().query, page, limit]
  );

  console.log(getValues());

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
      <ToastContainer />
      <TestNotification />
    </div>
  );
};
