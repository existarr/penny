// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AccountCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  bank: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AccountCard({ bank, number, balance, icon, color = 'primary', sx}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
    >
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">은행: {bank}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        계좌번호: {number}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        잔고: {balance}
      </Typography>
    </Card>
  );
}
