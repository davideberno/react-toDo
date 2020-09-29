import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icons: {
    display: "flex",
    justifyContent: "center",
  },
  iconsH4: {
    marginTop: theme.spacing(1),
  },
  iconImg: {
    width: "40%",
    height: "40%",
  },
  logo: {
    width: "80%",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img
            className={classes.logo}
            src="/img/uokpl.rs-react-logo-png-5245944.png"
            alt="React logo"
          />
        </Avatar>
        <Typography component="h1" variant="h3">
          Welcome
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={() => history.push("/signin")}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={() => history.push("/signup")}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Grid container className={classes.iconsH4}>
            <Grid item>
              <Typography component="h4">{"Or sign in with:"}</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.icons} spacing={2}>
            {/* <Grid item xs={4}>
              <Link href="/api/auth/facebook">
                <IconButton aria-label="delete">
                  <img
                    className={classes.iconImg}
                    src="/img/facebook-colored-af4249157d.svg"
                    alt="Facebook logo"
                  />
                </IconButton>
              </Link>
            </Grid> */}
            <Grid item xs={4}>
              <Link href="/api/auth/google">
                <IconButton aria-label="delete">
                  <img
                    className={classes.iconImg}
                    src="/img/google-colored-20b8216731.svg"
                    alt="Google logo"
                  />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
