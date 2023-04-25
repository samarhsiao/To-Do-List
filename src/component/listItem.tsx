import { useState, useRef, useEffect, useCallback } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { CiTrash, CiEdit, CiCircleMore } from 'react-icons/ci';
import { ToDoItem } from '../types/toDoItem';
import { ApiResponse, ApiReqData } from '../types/apiResponse';
import MyModal from './modalOfItem';
import axios from 'axios';
import Swal from 'sweetalert2';
type Props = {
  item: ToDoItem;
  getAllLists: () => void;
};
export default function ListItem({ item, getAllLists }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string | undefined>('');
  const [modalShow, setModalShow] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  const checkItem = async function (item: ToDoItem) {
    if (isEditing) return;
    try {
      const reqData: ApiReqData = {
        title: item.title,
        isDone: !item.isDone,
      };
      const { status } = await axios.patch<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/todos/${item._id}`,
        reqData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 200) {
        //console.log('check');
        getAllLists();
      }
      return;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Swal.fire({
          text: `${err}`,
          icon: 'error',
          confirmButtonColor: '#060D08',
        });
      } else {
        Swal.fire({
          text: 'Unexpected error',
          icon: 'error',
          confirmButtonColor: '#060D08',
        });
      }
    }
  };

  const deleteItem = async (id: string) => {
    const { status } = await axios.delete<ApiResponse>(
      `${process.env.REACT_APP_API_URL}/api/todos/${id}`,
    );
    if (status === 200) {
      getAllLists();
    }
  };

  const updateItem = async (item: ToDoItem) => {
    try {
      const reqData: ApiReqData = {
        title: item.title,
        isDone: item.isDone,
      };
      const { status } = await axios.put<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/todos/${item._id}`,
        reqData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (status === 200) {
        setIsEditing(false);
        getAllLists();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Swal.fire({
          text: `${err}`,
          icon: 'error',
          confirmButtonColor: '#060D08',
        });
      } else {
        Swal.fire({
          text: 'Unexpected error',
          icon: 'error',
          confirmButtonColor: '#060D08',
        });
      }
    }
  };

  useEffect(() => {
    setText(item.title);
  }, []);

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <li>
        <div className="checkbox col-8">
          {item.isDone && <AiOutlineCheck style={{ position: 'absolute' }} />}
          <input type="checkbox" />
          <label>
            <span
              className="checkbox-mask"
              onClick={() => checkItem(item)}
            ></span>
            {
              <input
                ref={editRef}
                className={`task-item edit-block ${
                  item.isDone && !isEditing ? 'is-done' : ''
                }`}
                placeholder="editing..."
                value={text}
                onChange={(e) => {
                  if (!isEditing) return false;
                  setText(e.target.value);
                }}
                disabled={!isEditing ? true : false}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    if (evt.currentTarget.value === '')
                      alert('Enter something');
                    const newItem: ToDoItem = {
                      _id: item._id,
                      title: evt.currentTarget.value,
                      isDone: item.isDone,
                    };
                    if (evt.currentTarget.value === item.title) return;
                    updateItem(newItem);
                  }
                }}
                onBlur={() => {
                  setIsEditing(false);
                  setText(item.title);
                }}
              />
            }
          </label>
        </div>
        <CiCircleMore
          style={{
            width: '1.3em',
            height: '1.3em',
            cursor: 'pointer',
          }}
          onClick={() => {
            setModalShow(true);
          }}
        />
        <CiEdit
          style={{
            width: '1.3em',
            height: '1.3em',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsEditing(true);
            setText('');
          }}
        />
        <CiTrash
          style={{
            width: '1.3em',
            height: '1.3em',
            cursor: 'pointer',
          }}
          onClick={() => {
            deleteItem(item._id);
          }}
        />
      </li>
      {modalShow && (
        <MyModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          item={item}
        />
      )}
    </>
  );
}
