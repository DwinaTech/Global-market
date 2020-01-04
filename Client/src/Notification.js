import React from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import "./notification.css";

const Notification = ({ open, clearError, title, message }) => {
    return (
      <Modal
        open={open}
        onClose={clearError}
        size="mini"
      >
        <Modal.Header>{title}:</Modal.Header>
        <Modal.Content>
          <p>{message}</p>
          <Button onClick={clearError}>
            <Icon name="times" color="red" />
          </Button>
        </Modal.Content>
      </Modal>
    );
}

export default Notification;
