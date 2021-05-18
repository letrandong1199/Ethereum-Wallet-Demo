import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    overflow: "auto",
    padding: "0",
    margin: "0",
    width: "100%",
    boxShadow: "none",
    borderRadius: "0",
    border: "0",
  },
  divider: {
    width: "100%",
    backgroundColor: "#EAEAEA",
  },
  buttonEdit: {
    marginRight: "10px",
    height: "14px",
    minWidth: "14px",
    padding: "0",
  },
  buttonDelete: {
    height: "14px",
    minWidth: "14px",
    padding: "0",
  },
  listItemEven: {
    "&:hover": {
      backgroundColor: "#EFF6FC",
      color: "#005A9E",
    },
  },
  listItemOdd: {
    backgroundColor: "#EFF6FC",
    color: "#005A9E",
  },
}));

export default useStyles;
