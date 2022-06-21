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
                                   <div>Repo</div>
                            </Heading>
                        </a>
                    </Column>
                    <Column>
                        <Heading>Column 2</Heading>
                        <FooterLink href="#">
                        <i className="fab fa-facebook-f">
                            <span style={{ marginLeft: "10px" }}>
                            Link to somewhere
                            </span>
                        </i>
                        </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Column 3</Heading>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;
