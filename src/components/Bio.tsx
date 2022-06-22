import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import React from 'react';

const Intro = styled.div`
  padding: 2em;
  font-size: 1em,
`

const Bio = ({bio}: {bio: string}) => {
  return (
    <>
      <Box style={{
        padding: '2em'
      }}>
        <Paper style={{
            textAlign: 'center',
            lineHeight: '40px',
            borderRadius: 10,
          }}><h3>{bio}</h3>
        </Paper>
      </Box>

      <Box style={{
        padding: '2em'
      }}>
        <Paper style={{
            borderRadius: 10,
          }}>
            <Intro>
              Welcome! This page was made using a bit of React, a bit of NodeJs and a dab of Typescript and a shoutout to Coolors for giving me colour palette ideas.
              Creating a dashboard for my strava runs has been a little hobby of mine for a while. 
              I initially concieved the idea about 9 months ago at the time of writing, but unfortunetly never made very far.
              Bogged down by the chocies of frameworks, technologies and all the other bits that encompase today's web developement, 
              being a general busy bod and having spent the day just doing a bunch of react/js for my (now previous) day job, finding the time & motivation
              to actually put a decent amount of hours anywhere was difficult and the project just fell by the way side
              <br/><br/>
              Until now! With Fridays now free, new found motivation as well as now being a better developer than I was, 
              I now have a better understanding of how to approach the FE & BE to this project, what technologies to use and 
              how to use them with getting bogged down and overcomplicating things as it's very each to fall down the "get it perfect first time" rabbit whole rather than the "get it working & upgrade later" one. 
              <br/><br/>
              So hopefully you'll see progress soon!
              😊

          </Intro>
        </Paper>
      </Box>
    </>
  )
}

export default Bio;
