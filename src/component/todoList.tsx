import { useEffect, useState } from 'react';

const ToDoList = ()=> {
    const [today,setToday] = useState('');

    useEffect(()=>{
        const timestamp = Date.now();
        const timeObj = new Date(timestamp);
        const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let index = +timeObj.getDay();
        setToday(dayArray[index]);
    },[])


    return(
    <div className="container">
    <div className="wrapper col-lg-5 col-md-7 col-12">
  
            <div className="col-12">
                <div className="today">&#x1F9AD;{` Happy ${today} !`}</div>       
               <ul className="todo-list ui-sortable">
                <li className="col-6 col-md-8"><div className="checkbox"><label><span className="checkbox-mask"></span><input type="checkbox"/>take resttake resttake rest
                </label></div></li>
                <li className="col-6 col-md-8"><div className="checkbox"><label><span className="checkbox-mask"></span><input type="checkbox"/>take rest</label></div></li>
                <li className="col-6 col-md-8"><div className="checkbox"><label><span className="checkbox-mask"></span><input type="checkbox"/>take rest</label></div></li>
               </ul>
               <div className="add-control">
                <div className="form-group d-flex">
                  <span className="add-icon"></span>
                   <textarea rows={3} className="add-item" placeholder="Enter task,ideas..."/>
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
    )
}
export default ToDoList;