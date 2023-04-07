
import { AiOutlineCheck } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import { ToDoItem } from '../types/toDoItem';
interface Props {
    isChecked:boolean,
    setIsChecked:(isChecked:boolean)=>void,
    isDeleted:boolean, 
    setIsDeleted:(isDeleted:boolean)=>void
    item:ToDoItem,
}
export default function ListItem(props:Props) {
    const { isChecked, setIsChecked, isDeleted, setIsDeleted, item} = props;
  return (
    <li className="col-10">
                    <div
                      className="checkbox"
                      onClick={()=>{
                        setIsChecked(!isChecked)
                      }}
                    >
                      {isChecked && (
                        <AiOutlineCheck style={{ position: 'absolute' }} />
                      )}
                      <input type="checkbox" />
                      <label>
                        <span className="checkbox-mask"></span>
                        <span className={`task-item ${item.isDone ? 'is-done' : ''}`}>{item.title}
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
  )
}
