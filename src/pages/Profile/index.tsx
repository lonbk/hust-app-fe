/* Libs */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Paper,
} from "@mui/material";
/* Components */
import Loading from "../../components/Loading";
/* Redux */
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSelector";
/* Types */

const Profile: React.FC = () => {
  /* Selector */
  const { status, error, userInfo, auth0Info } = useAppSelector(selectUser);

  if (!userInfo || !auth0Info) {
    return <Loading />;
  }

  return (
    <Paper sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
        >
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel htmlFor="username" color="primary">
              Username
            </FormLabel>
            <Input
              id="username"
              fullWidth
              defaultValue={auth0Info.nickname}
              readOnly
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel htmlFor="fullname" color="primary">
              Fullname
            </FormLabel>
            <Input
              id="fullname"
              fullWidth
              defaultValue={auth0Info.name}
              readOnly
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel htmlFor="email" color="primary">
              Email
            </FormLabel>
            <Input
              id="email"
              fullWidth
              defaultValue={auth0Info.email}
              readOnly
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel htmlFor="role" color="primary">
              Role
            </FormLabel>
            <Input id="role" fullWidth defaultValue={userInfo.role} readOnly />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
        >
          <Avatar alt="Avatar" src={auth0Info.picture} sx={{ width: '150px', height: '150px' }} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
