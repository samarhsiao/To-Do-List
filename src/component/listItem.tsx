import { useState, useRef } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { CiTrash, CiEdit } from 'react-icons/ci';
import { ToDoItem } from '../types/toDoItem';
import { ApiResponse, ApiReqData } from '../types/apiResponse';
import axios from 'axios';
import Swal from 'sweetalert2';
interface Props {
  item: ToDoItem;
  getAllLists: () => void;
}
export default function ListItem({ item, getAllLists }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>('');
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
        //console.log('check response', data);
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
      //TODO:fix rendering problem
      setIsEditing(false);
      getAllLists();
    }
  };

  return (
    <li>
      <div className="checkbox col-8" onClick={() => checkItem(item)}>
        {item.isDone && <AiOutlineCheck style={{ position: 'absolute' }} />}
        <input type="checkbox" />
        <label>
          <span className="checkbox-mask"></span>
          {isEditing ? (
            <input
              ref={editRef}
              className={`task-item edit-block`}
              placeholder="editing..."
              onKeyDown={(evt) => {
                if (evt.key === 'Enter') {
                  if (editRef.current?.value === '') alert('Enter something');
                  const newItem: ToDoItem = {
                    _id: item._id,
                    title: editRef.current?.value,
                    isDone: item.isDone,
                  };
                  if (editRef.current?.value === item.title)return
                  updateItem(newItem);
                }
              }}
            />
          ) : (
            <span className={`task-item ${item.isDone ? 'is-done' : ''}`}>
              {item.title}
            </span>
          )}
        </label>
      </div>
      <CiEdit
        style={{
          width: '1.3em',
          height: '1.3em',
          cursor: 'pointer',
        }}
        onClick={() => {
          setIsEditing(true);
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
  );
}
