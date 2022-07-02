import PropTypes from 'prop-types';
import SidebarMenu from './SidebarMenu';
import React, { useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { SidebarContext } from '../../../contexts/SidebarContext';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
} from '@mui/material';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const drawer = (
    <>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                Hello Christopher
            </Box>
        </Box>
        <BrowserView>
            <PerfectScrollbar
                component="div"
                style={{
                    height: !sidebarToggle ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}
            >
                sdfsdfshdfklj
                {/* <MenuList /> */}
            </PerfectScrollbar>
        </BrowserView>
        <MobileView>
            <Box sx={{ px: 2 }}>
                sdfsdfsdf
                {/* <MenuList /> */}
            </Box>
        </MobileView>
    </>
  );

  return (
    <>
        {/* Desktop sidebar */}
        <SidebarWrapper
            sx={{
            display: {
                xs: 'none',
                lg: 'inline-block'
            },
            position: 'fixed',
            left: 0,
            top: 0,
            background:
                theme.palette.mode === 'dark'
                ? alpha(lighten(theme.header.background!, 0.1), 0.5)
                : darken(theme.colors.alpha.black[100], 0.5),
            boxShadow:
                theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
            }}
        >
            <Box mt={3}>
                <Box
                    mx={2}
                    sx={{
                    width: 55
                    }}
                >
                    Hello Desktop
                </Box>
            </Box>
            <Divider
                sx={{
                    mt: theme.spacing(3),
                    mx: theme.spacing(2),
                    background: theme.colors.alpha.trueWhite[10]
                }}
                />
                <SidebarMenu />
            <Divider
            sx={{
                background: theme.colors.alpha.trueWhite[10]
            }}
            />
        </SidebarWrapper>

        {/* Mobile Sidebar */}
        <Drawer
            sx={{
            boxShadow: `${theme.sidebar.boxShadow}`
            }}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={sidebarToggle}
            onClose={closeSidebar}
            variant="temporary"
            elevation={9}
        >
            <SidebarWrapper
                sx={{
                    background:
                    theme.palette.mode === 'dark'
                        ? theme.colors.alpha.white[100]
                        : darken(theme.colors.alpha.black[100], 0.5)
                }}
            >
                <Box mt={3}>
                    <Box
                        mx={2}
                        sx={{
                        width: 52
                        }}
                    >
                    Hello Mobile
                    </Box>
                </Box>
                <Divider
                sx={{
                    mt: theme.spacing(3),
                    mx: theme.spacing(2),
                    background: theme.colors.alpha.trueWhite[10]
                }}
                />
                    <SidebarMenu />
                </SidebarWrapper>
            </Drawer>
    </>
  );

}

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
