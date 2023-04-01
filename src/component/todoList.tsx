const ToDoList = ()=> {
    return(<>
     <div className="container">
        <div className="today">Happy Saturday</div>
        <div className="row">
            <div className="">
               <div className="add-control">
                  <div className="form-group has-feedback">
                     <input type="text" className="form-control" placeholder="✍️ Add item..."/>
                     <i className="fa fa-plus form-control-feedback add-btn" title="Add item"></i>
                  </div>
               </div>
               <p className="err text-danger text-center hidden"><i className="fa fa-warning"></i> Oops! Please, enter name item</p>
               <p className="no-items text-muted text-center hidden"><i className="fa fa-ban"></i></p>
               <ul className="todo-list ui-sortable">
               <li data-id="Z1680330618325" className=""><div className="checkbox"><span className="close"><i className="fa fa-times"></i></span><label><span className="checkbox-mask"></span><input type="checkbox"/>This site uses 🍪to keep track of your tasks</label></div></li></ul>
            </div>
         </div>
    </div></>)
}
export default ToDoList