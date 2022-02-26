import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
      },
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    },
  }));

function GridSkeletonLoader() {
    const classes = useStyles();
    let count = 8;

    const fetchReports = () => {
        const result = [];
        for (let i = 0; i < count; i++){
            result.push(
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Box display="flex">
                            <Box display="flex"flexGrow={1}>
                                <Box>
                                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                </Box>
                                <Box display="flex"flexGrow={1} p={1}>
                                    <div style={{width:"100%"}}>
                                        <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            )
        }

        return result;
    }
    let content = fetchReports();
    return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            {content}
        </Grid>
    </div>
    )
}

export default GridSkeletonLoader
