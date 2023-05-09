import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
// import Header from './header';
import Nav from '../footer';
import Footer from './Footer';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
//   paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DonationLayout() {
  const [open, setOpen] = useState(false);
  const footerPaths = ["/penny/home", "/penny/donation", "/penny/singleDonation", "/penny/groupDonation", "/penny/donationHistory"];
  const showFooter = footerPaths.includes(useLocation().pathname);

  return (
    <StyledRoot>
      {/* <Header onOpenNav={() => setOpen(true)} /> */}

      {/* <Nav openNav={open} onCloseNav={() => setOpen(false)} /> */}

      <Main>
        <Outlet />
      </Main>

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      {showFooter && <Footer onOpenNav={() => setOpen(true)} />}
    </StyledRoot>
  );
}
