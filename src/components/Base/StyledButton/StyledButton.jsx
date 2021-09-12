import Button from "@material-ui/core/Button"
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FF9E00',
  },
}})(Button);


export default StyledButton;