import React from 'react';
import { Routes } from './routes/index';
import { themeCreator } from './theme/base';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import NavigationScroll from './layouts/NavigationScroll';
import { SidebarProvider } from './contexts/SidebarContext';
import { StravaProvider } from './contexts/StravaContext';

const App2 = () => {
    const theme = themeCreator('PureLightTheme');
    const client_id = process.env.REACT_APP_STRAVA_CLIENT_ID;
    if (client_id == null) {
        throw new Error("Missing Credentials");
    }
    
    return (
        <ThemeProvider theme={theme}>
            <SidebarProvider>
                <StravaProvider clientId={client_id}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </StravaProvider>
            </SidebarProvider>
        </ThemeProvider>
    );
}

export default App2