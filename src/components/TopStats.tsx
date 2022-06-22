import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const TopStats = (props: any) => {
    const { name, endpoint } = props;
    const [ stat, setStat ] = useState<undefined | any>(undefined);
    const [ loading, setLoading ] = useState(true)

    if (endpoint) {
        useEffect(() => {
            const getTop3 = async () => {
                const data = await fetch(`/api/${endpoint}`);
                setStat(await data.json())
            }
            getTop3();
            
            setLoading(false)
        }, [])
    }

    return (
        <>
            <Paper style={{
                textAlign: 'center',
                padding: 1,
                borderRadius: 10,
            }}>
                <h3>{name}</h3>
                <Divider variant="middle" />
                { loading 
                    ? <Box>Loading...</Box>
                    : <Box>Hello There</Box>
                }
            </Paper>
        </>
    )
}


export default TopStats;