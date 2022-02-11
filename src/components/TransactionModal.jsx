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

export default function ModalT({open,transaction,setOpen}) {
console.log(transaction)
var {hash,signature,receiver_id,signer_id} = transaction
  return (
    <div>
      
      <Modal
       keepMounted
        open={open}
      
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <iframe src="https://embed.lottiefiles.com/animation/9917"></iframe>
          <a href={`https://explorer.testnet.near.org/transactions/${hash}`}>Click to explore Transaction</a>
          <h3 className='truncate'>signature : {signature&&signature}</h3>
         <h3>receiver : {receiver_id&&receiver_id}</h3>
         <h3>signer : {signer_id&&signer_id}</h3>
         <Button className="mtb-1" onClick={()=>setOpen(false)} variant="contained" color="primary" >
                 Close
                </Button>
        </Box>

        

      
       

      </Modal>
    </div>
  );
}