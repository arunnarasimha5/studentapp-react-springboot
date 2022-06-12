import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

type CommonwarningProps = {
  showWarning: boolean;
  onCloseWarning: () => void;
  onOkClick: () => void;
  warningTitle: string;
  warningMessage: string;
};

export const CommonWarningPopup: FC<CommonwarningProps> = ({
  showWarning,
  onCloseWarning,
  onOkClick,
  warningMessage,
  warningTitle,
}) => (
  <Modal
    show={showWarning}
    onHide={onCloseWarning}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>{warningTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{warningMessage}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCloseWarning}>
        Close
      </Button>
      <Button variant="primary" onClick={onOkClick}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
);
