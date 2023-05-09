import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
import Iconify from '../../components/iconify';
//
import Searchbar from '../../layouts/dashboard/header/Searchbar';
import AccountPopover from '../../layouts/dashboard/header/AccountPopover';
import LanguagePopover from '../../layouts/dashboard/header/LanguagePopover';
import NotificationsPopover from '../../layouts/dashboard/header/NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));
const screenHeight = window.innerHeight;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
  },
  height: screenHeight * 0.08,
  position: 'fixed',
  bottom: -screenHeight,
  right: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-around',
  background: '#F7F7F7'
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Footer({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <NotificationsPopover />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
