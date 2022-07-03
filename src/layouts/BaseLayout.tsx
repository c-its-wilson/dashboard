import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

// import SidebarLayout from './MainLayout';
import { Box, alpha, lighten, useTheme, styled, Container } from '@mui/material';

import Sidebar from './MainLayout/Sidebar';
import Header from './MainLayout/Header';
import { drawerWidth } from '../services/constant';

export interface BaseLayoutProps {
  children?: ReactNode;
}

const mainContent = {
    height: '100%,',
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
}

// styles
const Main = styled('main')(({ theme }) => ({
  ...mainContent,
  ...({
      transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('md')]: {
          marginLeft: '20px'
      },
      [theme.breakpoints.down('sm')]: {
          marginLeft: '10px'
      }
  })
}));

const BaseLayout: FC<BaseLayoutProps> = () => {
  const theme = useTheme();
  return (
     <>
        <Box
          sx={{
            flex: 1,
            height: '100%',
            display: 'flex',

            '.MuiPageTitle-wrapper': {
              background:
                theme.palette.mode === 'dark'
                  ? theme.colors.alpha.trueWhite[5]
                  : theme.colors.alpha.white[50],
              marginBottom: `${theme.spacing(4)}`,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? `0 1px 0 ${alpha(
                      lighten(theme.colors.primary.main, 0.7),
                      0.15
                    )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                  : `0px 2px 4px -3px ${alpha(
                      theme.colors.alpha.black[100],
                      0.1
                    )}, 0px 5px 12px -4px ${alpha(
                      theme.colors.alpha.black[100],
                      0.05
                    )}`
            }
          }}
        >
          <Header />
          <Sidebar />
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              display: 'block',
              flex: 1,
              pt: `${theme.header.height}`,
              [theme.breakpoints.up('lg')]: {
                ml: `${theme.sidebar.width}`
              }
            }}
          >
            <Container maxWidth="xl" sx={{paddingTop: '30px'}}>
              <Outlet />
            </Container>
          </Box>
        </Box>
     </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
