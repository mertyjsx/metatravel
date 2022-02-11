import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal({open,signIn,setOpen}) {
console.log(open)

  return (
    <div>
      
      <Modal
       keepMounted
        open={open}
      
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Connect Wallet
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          You must connect a Wallet to continue. 
          </Typography>
          <Button className="mtb-1" onClick={signIn} variant="contained" color="primary" >
                 Connect Near Wallet
                </Button>

                <Button className="mtb-1" onClick={()=>setOpen(false)} variant="contained" color="primary" >
                 Close Modal
                </Button>
        </Box>
      </Modal>
    </div>
  );
}