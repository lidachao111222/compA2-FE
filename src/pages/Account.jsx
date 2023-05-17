// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";
import SignIn from "../components/SignInAndSignUp/SignIn";
import SignUp from "../components/SignInAndSignUp/SignUp";

const Account = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return <>{pathName === "/account/signin" ? <SignIn /> : <SignUp />} </>;
};

export default Account;
