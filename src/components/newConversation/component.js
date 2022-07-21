import { arrayOf, bool, func, shape } from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import styles from "../../styles/NewConversation.module.css";

export default function NewConversationComponent({
  createNewConversation,
  openNewConversationDialog,
  setMessage,
  setOpenNewConversationDialog,
  setUser,
  users,
}) {
  return (
    <Dialog
      data-testid="new-conversation-dialog"
      onClose={() => setOpenNewConversationDialog(false)}
      open={openNewConversationDialog}
    >
      <div className={styles.dialogContainer}>
        <DialogTitle>Nouveau message</DialogTitle>
        <FormControl fullWidth>
          <TextField
            inputProps={{ "data-testid": "select-user-input" }}
            label="Sélectionnez un utilisateur"
            onChange={({ target: { value } }) => setUser(value)}
            select
            variant="standard"
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user}>
                {user.nickname}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl className={styles.formControl} fullWidth>
          <InputLabel htmlFor="new-message">Entrez votre message...</InputLabel>
          <Input
            inputProps={{ "data-testid": "new-message-input" }}
            onChange={({ target: { value } }) => setMessage(value)}
            required
          ></Input>
        </FormControl>
        <Button
          data-testid="create-new-conversation-button"
          className={styles.submit}
          color="primary"
          fullWidth
          onClick={createNewConversation}
          variant="contained"
        >
          Envoyer
        </Button>
      </div>
    </Dialog>
  );
}

NewConversationComponent.propTypes = {
  createNewConversation: func,
  openNewConversationDialog: bool,
  setMessage: func,
  setOpenNewConversationDialog: func,
  setUser: func,
  users: arrayOf(shape({})),
};

NewConversationComponent.defaultProps = {
  createNewConversation: (f) => f,
  openNewConversationDialog: false,
  setMessage: (f) => f,
  setOpenNewConversationDialog: (f) => f,
  setUser: (f) => f,
  users: [],
};
