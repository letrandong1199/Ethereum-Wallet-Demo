import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(() => ({
    root: {
        minWidth: '275'
    },
    paper: {
        height: "48px",
        backgroundColor: "#fff",
        boxShadow: "none",
        border: "1px solid #F0F0F0",
        borderRadius: "0px"
    },
    bodyPaper: {
        backgroundColor: '#f9f9f9',
        borderRadius: "0px",
        height: "980px"
    },
    linka: {
        color: "#05c0a5",
        textDecoration: "none",
        '&:hover': {
            textDecoration: "underline",
            color: "#05c05a"
        }
    },
    btnGenerate: {
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        borderColor: '#05a05c',
        color: '#05a05c',
        "&:hover": {
            backgroundColor: "#05a05c",
            color: '#fff'
        }
    }
}))
export default useStyles;