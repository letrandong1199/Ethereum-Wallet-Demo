import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    backgroundColor: "#f8f8f8",
    border: "none",
    boxShadow: "none",
  },
  text: {
    fontSize: "1.75rem",
    textAlign: "left",
    letterSpacing: "-.04em",
    fontWeight: "bold",
    margin: "0 20px 0px 24px",
  },
  paper: {
    display: "flex",
    border: "none",
    borderBottom: "1px solid #D2D2D2",
    boxShadow: "none",
    alignItems: "center",
    width: "100%",
    height: "76px",
  },
  avatar: {
    fontSize: "17px",
    color: "#fff",
    backgroundColor: "#E06c00",
    width: "48px",
    height: "48px",
    marginLeft: "20px",
  },
  formGroup: {
    width: "100%",
    margin: "15px 15px",
  },
  btnSubmit: {
    backgroundColor: "rgb(0, 120, 212)",
    color: "white",
    fontSize: "1rem",
    margin: "15px 0px",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      borderColor: "rgb(0, 90, 182)",
      backgroundColor: "rgb(0, 90, 182)",
    },
  },
}));
export default useStyles;
