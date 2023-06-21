import axios from "./axios";

const API = "http://localhost:9000/api"    

export const registerRequest = (user) =>
  axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verify`);

export const updateUserRequest = async (id, user) =>
  axios.put(`/profile/${id}`, user);

/*
export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);*/