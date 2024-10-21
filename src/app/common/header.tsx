import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button, Container } from '@mui/material';

const Header: React.FC = () => {
    const router = useRouter();
    
    const handleLogout = () => {
        Cookies.remove('currentUser');
        router.replace('/login');
    };

    return (
      <>
        <Container>
          <Button sx={{margin:'10px 0px'}} variant="contained" onClick={handleLogout}>
              Logout
          </Button>
        </Container>
      </>
    );
};

export default Header;
