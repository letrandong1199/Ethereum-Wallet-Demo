import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  btnMine: {
    backgroundColor: "#05c0a5",
    color: "#fff",
    textTransform: "capitalize",
    margin: "20px 14px 24px 20px",
    padding: "6px 15px",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#05c0b5",
    },
  },
}));
export default useStyles;
