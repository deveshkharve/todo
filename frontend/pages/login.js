import {
  Autocomplete,
  Box,
  Button,
  Card,
  InputBase,
  Popper,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { processLoginRequest } from "../src/auth";


const lightTheme = createTheme({ palette: { mode: "light" } });

const SignIn = () => {
  const router = useRouter();
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [currState, setCurrentState] = useState('login');
  const [userName, setUserName] = useState();
  const [password, sePassword] = useState();

  const submitForm = () => {
    console.log(currState, userName)
    setLoading(true);
    processLoginRequest(currState, userName, password)
    .then(result => {
      if (result.success) push('/home') 
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  return (
    <ThemeProvider theme={lightTheme}>
      {/* ------------------------- light-theme CONTAINER */}
      <Box color="#000" bgcolor="#FEFBEB" width="100vw" height="100vh">
        {/* ------------------------- INNER CONTAINER */}
        <Box maxWidth="1100px" m="0 auto">
          <Stack
            justifyContent="center"
            alignItems="center"
            height="100vh"
            gap={7}>
            <Typography variant="h2" lineHeight={1} textAlign="center">
              TODO
            </Typography>
            <Typography variant="h4" lineHeight={1} textAlign="center">
              {currState == 'login' ? 'Login' : 'Register' }
            </Typography>
            <Stack width={330} gap={2} mb={25}>
              <Card
                elevation={2}
                sx={{ pt: 1, pb: 0.5, px: 2, borderRadius: 2 }}>
                <InputBase
                  size="small"
                  autoFocus
                  fullWidth
                  placeholder="user name"
                  value={userName}
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <br/>
                <InputBase
                  size="small"
                  type="password"
                  autoFocus
                  fullWidth
                  placeholder="password"
                  value={password}
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => sePassword(e.target.value)}
                />
                <Button
                  onClick={() => submitForm()}
                  sx={{
                    textTransform: "none",
                    alignSelf: "start",
                    p: "3px 15px",
                    color: 'black',
                    backgroundColor: '#e8e8e8'
                  }}>
                {currState == 'login' ? 'Login' : 'Register' }
                </Button>
              </Card>
              <Button
                onClick={() => setCurrentState(currState == 'login' ? 'register' : 'login')}
                sx={{
                  textTransform: "none",
                  alignSelf: "start",
                  p: "3px 15px",
                }}>
                {currState == 'login' ? 'New to this? click here to register' : 'click here to login' }
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
