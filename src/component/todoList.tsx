import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { CiTrash } from "react-icons/ci";
import { Fade } from "react-awesome-reveal";
const ToDoList = () => {
  const [today, setToday] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    const timestamp = Date.now();
    const timeObj = new Date(timestamp);
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let index = +timeObj.getDay();
    setToday(dayArray[index]);
  }, []);


  return (
    <div className="container">
      <div className="wrapper col-lg-5 col-md-7 col-12">

        <div className="col-12">
          <div className="today">&#x1F9AD;{` Happy ${today} !`}</div>
          <ul className="todo-list ui-sortable">
            
              {!isDeleted  && <li className="col-8 col-md-9">
                <div className="checkbox" onClick={() => {
                  setIsChecked((val) => !val);
                }}>
                  {isChecked && <AiOutlineCheck style={{ position: "absolute" }} />}
                  <input type="checkbox" />
                  <label>
                    <span className="checkbox-mask">
                    </span><span className={isChecked ? "is-done" : ""}>take rest take resttake rest</span>
                  </label>
                </div>
                <CiTrash style={{ width: "1.3em", height: "1.3em", margin: "0px 4px" }} onClick={()=>{
                  setIsDeleted(true);
                }}/>
              </li>}
           
          </ul>
          <div className="add-control">
            <div className="form-group d-flex">
              <span className="add-icon"></span>
              <textarea rows={3} className="add-item" placeholder="Enter task,ideas..." />
              <div className="add-button">Add</div>
            </div>
          </div>
          {/* <div className="buttonWrapper">
                <span className="add-icon d-none"></span>
                 
             </div>  */}
          {/* 錯誤提示  */}
          {/* <p className="err text-danger text-center hidden"><i className="fa fa-warning"></i> Oops! Please, enter name item</p>  */}
        </div>


      </div>
    </div>
  );
};
export default ToDoList;