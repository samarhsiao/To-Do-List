import { ToDoItem } from '../types/toDoItem';
import { Button, Modal } from 'react-bootstrap';
import { BsCheckCircleFill, BsHammer } from 'react-icons/bs';

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
          <div className="modal-text">
            <p className="col-6">
              <strong>ToDo:</strong>&nbsp;<span>{item.title}</span>
            </p>
            <p>
              <strong>Status:</strong>&nbsp;
              <span>
                {item.isDone ? (
                  <BsCheckCircleFill
                    style={{ fill: '#43A047', width: '1.1em', height: '1.1em' }}
                  />
                ) : (
                  <BsHammer
                    style={{ fill: '#FFC007', width: '1.1em', height: '1.1em' }}
                  />
                )}
              </span>
            </p>
          </div>
          <p>
            <strong>Created date:</strong>&nbsp;
            <span>
              {item.createdAt
                ?.slice(0, 10)
                .replace('-', ' / ')
                .replace('-', ' / ')}
            </span>
          </p>
          <p>
            <strong>Last update:</strong>&nbsp;
            <span>
              {item.updatedAt
                ?.slice(0, 10)
                .replace('-', ' / ')
                .replace('-', ' / ')}
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalShow(false);
            }}
            style={{ backgroundColor: 'rgb(6, 13, 8)' }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
