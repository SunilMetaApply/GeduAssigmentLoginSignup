// "use client"
// import { Button } from '@mui/material';
// import React, { useState } from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import CreateModal from './createModal'
// import { SignUpInterface } from '../../interface';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 1200,
//   bgcolor: 'background.paper',
//   border: '1px solid #000',
//   boxShadow: 24,
//   p: 2,
// };


// const createStudent:React.FC = () => {
//   const [submitLoad, setSubmitLoad] = useState(false);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSubmit = (values: SignUpInterface) => {
//       setSubmitLoad(true);
//       setTimeout(() => {
//           console.log(values); 
//           setSubmitLoad(false);
//       }, 1000);
//   };


//   return (
//     <>
//       <Button onClick={handleOpen}>Add Student</Button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             timeout: 500,
//           },
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//                <CreateModal/>
//           </Box>
//         </Fade>
//       </Modal>

//     </>
//   )
// }

// export default createStudent
