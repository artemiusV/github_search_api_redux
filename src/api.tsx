import React from "react";
import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "https://api.github.com",
});

export const fetchUsers = async (
  query: string,
  page: number,
  limit: number
) => {
  try {
    const { data } = await instanceAxios.get("/search/users?q=" + query, {
      params: {
        page,
        per_page: limit,
      },
    });
    return data?.items;
  } catch (error) {
    return null;
  }
};

export const fetchUserData = async (login: string) => {
  const response = await instanceAxios.get(`/users/${login}`);
  return response;
};

export const fetchUserRepos = async (login: string) => {
  const response = await instanceAxios.get(`/users/${login}/repos`);
  return response;
};
