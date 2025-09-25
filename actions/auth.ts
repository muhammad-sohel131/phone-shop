"use server";
import { User } from "@/models/Model";
import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
  const res = await User.create(data)
  console.log(res)
  return {
    name: res.name,
    email: res.email
  };
};

export const login = async (data: FieldValues) => {
  const res = await User.findOne({email: data.email})
  return {
    name: res.name,
    email: res.email
  };
};