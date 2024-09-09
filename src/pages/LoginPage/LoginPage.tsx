// src/components/LoginPage.tsx
import React, { useState } from "react";
import { InputAdornment, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import epicureLogo from "/assets/images/epicureLogo.png";
import { AccountCircle, Lock } from "@mui/icons-material";
import {
  StyledContainer,
  StyledBox,
  StyledButton,
  StyledLogInTypography,
  StyledLogo,
  StyledTextField,
  StyledTypography,
} from "./LoginPage.styles";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      navigate("/dashboard"); 
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledBox>
        <StyledLogo src={epicureLogo}></StyledLogo>
        <StyledTypography variant="h4">Welcome Back!</StyledTypography>
        <StyledLogInTypography>Sign in to your account</StyledLogInTypography>
        <StyledTextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <StyledButton variant="contained" onClick={handleLogin} fullWidth>
          SIGN IN
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default LoginPage;
