import React from 'react'
import { Paper, Typography, Button } from '@material-ui/core'
import useStyles from './style'
const CreateWallet = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
            </Paper>
            <Paper className={classes.bodyPaper}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontWeight: "500", fontSize: "30px", lineHeight: "42px", marginBottom: "15px" }}>Get a New Wallet</h2>
                    <h5 style={{ fontWeight: "400", fontSize: "14px", marginBottom: "15px" }}>Already have a Wallet ?
                    <a href="/access-wallet" className={classes.linka}> Access My Wallet</a>
                    </h5>
                </div>
                <div>
                    <div style={{ margin: '0 auto', width: '400px', height: '400px', backgroundColor: '#fff' }}>
                        <Typography style={{ textAlign: 'center', backgroundColor: '#434f61', color: '#fff', padding: '6px 18px', borderRadius: '10px 10px 0 0' }}>By Private Key</Typography>
                        <Button variant="filled" color="primary" style={{ margin: '0 auto' }}>Generate Private Key</Button>
                    </div>
                </div>
            </Paper>
        </React.Fragment>
    )
}
export default CreateWallet;