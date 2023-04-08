import { AiOutlineCheck } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import { ToDoItem } from '../types/toDoItem';
import { ApiResponse, ApiReqData } from '../types/apiResponse';
import axios from 'axios';
import Swal from 'sweetalert2';
interface Props {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  isDeleted: boolean;
  setIsDeleted: (isDeleted: boolean) => void;
  item: ToDoItem;
  setAllLists: (allLists: ToDoItem[]) => void;
  allLists: ToDoItem[];
  getAllLists:()=>void
}
export default function ListItem({
  setIsDeleted,
  item,
  getAllLists
}: Props) {
  const checkItem = async function (item: ToDoItem) {
    try {const reqData: ApiReqData = {
      title: item.title,
      isDone: item.isDone,
    };
    const { status } = await axios.put<ApiResponse>(
      `${process.env.REACT_APP_API_URL}/api/todos/:${item._id}`,
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
    }}catch (err) {
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
  return (
    <li className="col-10">
      <div className="checkbox" onClick={() => checkItem(item)}>
        {item.isDone && <AiOutlineCheck style={{ position: 'absolute' }} />}
        <input type="checkbox" />
        <label>
          <span className="checkbox-mask"></span>
          <span className={`task-item ${item.isDone ? 'is-done' : ''}`}>
            {item.title}
          </span>
        </label>
      </div>
      <CiTrash
        style={{
          width: '1.3em',
          height: '1.3em',
        }}
        onClick={() => {
          setIsDeleted(true);
        }}
      />
    </li>
  );
}