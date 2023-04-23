import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
// components
import Iconify from "../../components/iconify";

//import user data
import user from "../data/users";

//import components
import AccountCard from "../components/AccountCard";

var accountInfo = [];
user.map((u) => {
  u.account.map((acc, index) => (accountInfo[index] = acc));
});

export default function JsonSample() {
  return (
    <>
      <Helmet>
        <title> Json Sample </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          {user.map((u) => (
            <Typography variant="h4" gutterBottom>
              {u.name}
            </Typography>
          ))}
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {accountInfo.map((acc) => (
            <Grid item xs={12} sm={6} md={3}>
              <AccountCard
                bank={acc.bank}
                number={acc.number}
                balance={acc.balance}
                icon={"ant-design:android-filled"}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
