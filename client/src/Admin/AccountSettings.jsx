import React from 'react'

import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
  } from '@mui/material';

const AccountSettings = () => {
  return (

       <>
      <DialogContent dividers>
        <DialogContentText>
          For security reason, you need to provide your credentials to do any of
          these actions:
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
        { (
          <Button>
            Change Password
          </Button>
        )}
        <Button>
          Change Email
        </Button>
        <Button>
          Delete Account
        </Button>
      </DialogActions>
    </>
  );
};
    
export default AccountSettings
