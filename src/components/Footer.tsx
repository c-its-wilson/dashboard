import { Stack } from "@mui/material";
import React from "react";
import github from '../assets/github.png'

import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";

const Footer = () => {
    return (
        <>
        <Box>
            <Stack 
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Column>
                    <a href="https://github.com/c-its-wilson/strava-dashboard" style={{textDecoration: "none"}} >
                        <Heading>
                            <img src={github} alt="" width="25"/>
                            <div>Repo</div>
                        </Heading>
                    </a>
                </Column>
                <Column>
                    <Heading>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{textDecoration: "none"}}>
                        <Heading>
                            <div>CW</div>
                        </Heading>
                        </a>
                    </Heading>
                </Column>
                <Column>
                    {/* <a href="https://strava.com/athletes/5626404" className="strava-badge- strava-badge-follow" target="_blank"><img src="//badges.strava.com/echelon-sprite-48.png" alt="Strava" /></a> */}
                </Column>
            </Stack>
        </Box>
        </>
    );
};
export default Footer;


//2ac3e6073f45333e5d435945f74767cf38294825