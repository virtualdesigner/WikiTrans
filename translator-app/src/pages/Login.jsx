import React, { useEffect, useState } from "react";
import { isLoggedIn, login } from "../services/auth";
import styled from 'styled-components';

const LoginFormWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
`;

const LoginTitle = styled.h2`
    color: #ec4816;
    font-family: sans-serif;
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 80px;
`

const LoginForm = styled.form`
    padding: 30px;
`;

const LoginInput = styled.input`
    padding: 10px;
    border: none;
    background: #eee;
    border-radius: 3px;
    outline: none;
    display: block;
    margin-bottom: 25px;
    min-width: 250px;
`;

const LoginSubmitBtn = styled.button`
    padding: 10px 20px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #ec4816;
    color: white;
    border-radius: 3px;
    font-family: sans-serif;
    font-weight: 800;
    font-size: 1rem;
    min-width: 100%;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn()) window.location.assign('/dashboard');
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({username, password});
    window.location.assign('/dashboard');
  };

  return (
    <LoginFormWrapper>
      <LoginForm onSubmit={handleLogin}>
        <LoginTitle>Login</LoginTitle>
        <LoginInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <LoginSubmitBtn type="submit">Submit</LoginSubmitBtn>
      </LoginForm>
    </LoginFormWrapper>
  );
};

export default Login;
