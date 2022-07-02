import React from 'react';
import { Routes } from './routes/index';
import { themeCreator } from './theme/base';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import NavigationScroll from './layouts/NavigationScroll';
import { SidebarProvider } from './contexts/SidebarContext';

const App2 = () => {
    const theme = themeCreator('PureLightTheme');
    return (
        <ThemeProvider theme={theme}>
            <SidebarProvider>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </SidebarProvider>
        </ThemeProvider>
    );
}

export default App2