// src/components/LoginPage.tsx
import { useEffect, useState } from "react";
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
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { login } from "../../store/thunks/UserThunk";
import { hashPassword } from "../../utils/encrypt";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(""); 
      const hashedPassword = hashPassword(password);
      console.log(hashedPassword)
      const resultAction = await dispatch(login({ email, password: hashedPassword }));
      
      if (login.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } 
      else if (login.rejected.match(resultAction)) {
        setError(resultAction.payload as string || "Invalid email / password");
      } 
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

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
          value={email}
          onChange={(e) => {setEmail(e.target.value);
            setError("")
          }}
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
          onChange={(e) => {setPassword(e.target.value);
            setError("")
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
       {error && <Typography sx={{ fontSize: "15px", margin:"0", padding: "0" }} color="error">{error}</Typography>}
        <StyledButton variant="contained" onClick={handleLogin} fullWidth>
          SIGN IN
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default LoginPage;
