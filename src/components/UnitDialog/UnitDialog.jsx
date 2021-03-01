import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select a mount.</DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick(null)}>
          <ListItemText primary="None" />
        </ListItem>
        {props.hasOwnProperty("mounts") &&
          props.mounts.map((el, i) => (
            <ListItem button onClick={() => handleListItemClick(el)} key={i}>
              <ListItemAvatar>
                <Avatar
                  alt={el.name}
                  src={
                    require(`../../images/unit_card/card_icon/${el.image}.png`)
                      .default
                  }
                >
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={el.name} />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}

export default SimpleDialog;
