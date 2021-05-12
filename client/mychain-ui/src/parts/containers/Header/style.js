import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    paper: {
        height: "48px",
        backgroundColor: "#fff",
        boxShadow: "none",
        border: "1px solid #F0F0F0",
        borderRadius: "0px"
    },
    root: {
        padding: '6px 12px',
        backgroundColor: '#fff',
        borderColor: '#05c0a5',
        color: '#05c0a5',
        '& :hover': {
            backgroundColor: '#05c0a5',
            color: '#fff',
            width: '100%'
        },
    },
    link: {
        textDecoration: 'none'
    }

}));

export default useStyles;