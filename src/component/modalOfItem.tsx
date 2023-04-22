import {ToDoItem } from '../types/toDoItem';

import { Button, Modal } from 'react-bootstrap';

type Props = {
  modalShow: boolean;
  setModalShow: (modalShow: boolean) => void;
  item: ToDoItem;
};

export default function ModalOfItem({ modalShow, setModalShow, item }: Props) {
  return (
    <>
      <Modal
        show={modalShow}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {/* <h4>{item.title}</h4> */}
          <p>ToDo: {item.title}</p>
          <p>Created Date: {item.createdAt?.slice(0,10).replace('-',' / ').replace('-',' / ')}</p>
          <p>Updated Date: {item.updatedAt?.slice(0,10).replace('-',' / ').replace('-',' / ')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
