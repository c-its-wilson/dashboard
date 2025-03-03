import PropTypes from "prop-types";
import SidebarMenu from "./SidebarMenu";
import React, { useContext } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { SidebarContext } from "../../../contexts/SidebarContext";
import logo from "../../../assets/logo-no-background.png";

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
  IconButton,
  Button,
} from "@mui/material";
import Scrollbar from "../../../components/Scrollbar";

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

  return (
    <>
      {/* Desktop sidebar */}
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "dark"
              ? alpha(lighten(theme.header.background!, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box mx={2} sx={{ width: 100 }}>
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu />
          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box
          sx={{
            position: "fixed",
            left: "120px",
            padding: theme.spacing(1, 0),
          }}
        >
          <IconButton aria-label="delete" size="large">
            <a
              href="https://github.com/c-its-wilson/strava-dashboard"
              style={{ textDecoration: "none" }}
            >
              <GitHubIcon
                sx={{
                  fontSize: "40px",
                  color: "#F5F0F6",
                  marginBottom: "40px",
                }}
              />
            </a>
          </IconButton>
        </Box>
      </SidebarWrapper>

      {/* Mobile Sidebar */}
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box mx={2} sx={{ width: 100 }}>
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarMenu />
          </Scrollbar>
          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <Box
            sx={{
              position: "fixed",
              left: "120px",
              padding: theme.spacing(1, 0),
            }}
          >
            <IconButton aria-label="delete" size="large">
              <a
                href="https://github.com/c-its-wilson/strava-dashboard"
                style={{ textDecoration: "none" }}
              >
                <GitHubIcon
                  sx={{
                    fontSize: "40px",
                    color: "#F5F0F6",
                    marginBottom: "40px",
                  }}
                />
              </a>
            </IconButton>
          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;

const Logo = () => <img src={logo} width="50" />;
