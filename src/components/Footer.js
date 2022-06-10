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
        <Box>
            <Container>
                <Row>
                    <Column>
                        <a href="https://github.com/c-its-wilson/strava-dashboard" style={{textDecoration: "none"}} >
                            <Heading> 
                                <img src={github} alt="" width="25"/>
                                Repository
                            </Heading>
                        </a>
                    </Column>
                    {/* <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="#">
                        <i className="fab fa-facebook-f">
                            <span style={{ marginLeft: "10px" }}>
                            Facebook
                            </span>
                        </i>
                        </FooterLink>
                    </Column> */}
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;
