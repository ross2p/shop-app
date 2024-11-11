import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { SocialIcon } from "react-social-icons";
import { fetchRegister } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

// import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  // height: "100%",
  // margin: 20,
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("light");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
  const [yearError, setYearError] = React.useState(false);
  const [yearErrorMessage, setYearErrorMessage] = React.useState("");
  const [dayError, setDayError] = React.useState(false);
  const [dayErrorMessage, setDayErrorMessage] = React.useState("");
  const [monthError, setMonthError] = React.useState(false);
  const [monthErrorMessage, setMonthErrorMessage] = React.useState("");

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!firstName.value || firstName.value.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage("");
    }

    if (!day.value || day.value.length < 1 || day.value > 31) {
      setDayError(true);
      setDayErrorMessage("Day is required.");
      isValid = false;
    } else {
      setDayError(false);
      setDayErrorMessage("");
    }

    if (!month.value || month.value.length < 1 || month.value > 12) {
      setMonthError(true);
      setMonthErrorMessage("Month is required.");
      isValid = false;
    } else {
      setMonthError(false);
      setMonthErrorMessage("");
    }

    if (!year.value || year.value.length < 1 || year.value > 2021) {
      setYearError(true);
      setYearErrorMessage("Year is required.");
      isValid = false;
    } else {
      setYearError(false);
      setYearErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dateOfBirth = new Date(
      data.get("year"),
      data.get("month"),
      data.get("day")
    );
    const user = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      birthdate: `${data.get("year")}-${data.get("month")}-${data.get("day")}`,
      roleId: "a01593ee-052b-44dd-99b2-5cf72a017dbe",
    };
    const newUser = await fetchRegister(user);
    navigate("/");
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Stack
        sx={{
          justifyContent: "center",
          // height: "115dvh",
          p: 2,
        }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <TextField
                autoComplete="firstName"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="Jon"
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={firstNameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <TextField
                autoComplete="lastName"
                name="lastName"
                required
                fullWidth
                id="lastName"
                placeholder="Snow"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>

              {/* Контейнер з Flexbox для розташування в рядок */}
              <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                <TextField
                  autoComplete="off"
                  name="day"
                  required
                  id="day"
                  placeholder="Day"
                  inputProps={{ maxLength: 2 }}
                  error={dayError}
                  helperText={dayErrorMessage}
                  color={dayError ? "error" : "primary"}
                />
                <TextField
                  autoComplete="off"
                  name="month"
                  required
                  id="month"
                  placeholder="Month"
                  inputProps={{ maxLength: 2 }}
                  error={monthError}
                  helperText={monthErrorMessage}
                  color={monthError ? "error" : "primary"}
                />
                <TextField
                  autoComplete="off"
                  name="year"
                  required
                  id="year"
                  placeholder="Year"
                  inputProps={{ maxLength: 4 }}
                  error={yearError}
                  helperText={yearErrorMessage}
                  color={yearError ? "error" : "primary"}
                />
              </Box>
            </FormControl>
            {/* <FormControl>
              <FormLabel htmlFor="password">Date of birth</FormLabel>
              <TextField
                required
                fullWidth
                name="dateOfBirth"
                placeholder="••••••"
                type="date"
                id="date"
                variant="outlined"
                error={passwordError} //todo create dateError
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                defaultValue="2024-09-04"
              />
            </FormControl> */}
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link
                  href="/sign-in"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={
                <SocialIcon
                  url="https://google.com"
                  style={{ height: 25, width: 25 }}
                />
              }
            >
              Sign up with Google
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={
                <SocialIcon
                  url="https://facebook.com"
                  style={{ height: 25, width: 25 }}
                />
              }
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </Stack>
    </SignUpContainer>
  );
}
