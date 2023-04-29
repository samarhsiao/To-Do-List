import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import axios from 'axios';
import Swal from 'sweetalert2';
import ListItem from './listItem';
import { ToDoItem } from '../types/toDoItem';
import { ApiResponse, ApiReqData } from '../types/apiResponse';
import Searchbar from './searchbar';
import Spinner from './spinner';
import { setTimeout } from 'timers/promises';
//import { Fade } from "react-awesome-reveal";
const ToDoList = () => {
  const [today, setToday] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [allLists, setAllLists] = useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timestamp = Date.now();
    const timeObj = new Date(timestamp);
    const dayArray = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const index = +timeObj.getDay();
    setToday(dayArray[index]);
  }, []);

  const getAllLists = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/v1/todos`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (status === 200) {
        const timer: number = window.setTimeout(() => {
          setIsLoading(false);
          console.log('timer', timer);
        }, 300);
        if (data.data) {
          let itemsIsDone = [];
          let itemsIsDoneYet = [];
          itemsIsDone = data.data.filter((v: ToDoItem) => {
            return v.isDone === true;
          });
          itemsIsDoneYet = data.data.filter((v: ToDoItem) => {
            return v.isDone !== true;
          });
          const result = itemsIsDone.concat(itemsIsDoneYet);
          setAllLists(result);
        }
      }
      return;
    } catch (err) {
      setIsLoading(false);
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
  }, []);

  useEffect(() => {
    getAllLists();
  }, [getAllLists]);

  const addToList = async () => {
    if (!inputRef.current?.value) {
      setErrorMessage(true);
    } else {
      const reqData: ApiReqData = {
        title: inputRef.current.value,
        isDone: false,
      };
      try {
        const { status } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/todos`,
          reqData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (status === 201) {
          //console.log(data);
          getAllLists();
          inputRef.current.value = '';
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
    }
  };

  const deleteAllItems = async () => {
    try {
      const { status } = await axios.delete<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/v1/todos`,
      );
      if (status === 200) {
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

  return (
    <>
      <div className="container">
        <div className="wrapper col-lg-5 col-md-7 col-12 ">
          <div className="col-12">
            <div className="today">&#x1F9AD;{` Happy ${today} !`}</div>
            <Searchbar setAllLists={setAllLists} getAllLists={getAllLists} setIsLoading={setIsLoading}/>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <ul className="todo-list ui-sortable col-11 col-md-9">
                  {allLists.length == 0?<p className="notFound">Couldn&apos;t find any result</p>:
                    allLists.map((item, i) => {
                      return (
                        <ListItem
                          key={`${item._id}_${i}`}
                          item={item}
                          getAllLists={getAllLists}
                        />
                      );
                    })}
                </ul>
                <div className="buttonWrapper col-11 col-md-9">
                  {allLists.length !== 0 && (
                    <div
                      className="delete button"
                      onClick={() => {
                        Swal.fire({
                          title: 'Delete all the items?',
                          showCancelButton: true,
                          confirmButtonText: 'Yes',
                          confirmButtonColor: '#060D08',
                        }).then(function (result) {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            deleteAllItems();
                          }
                        });
                      }}
                    >
                      Del All
                    </div>
                  )}
                </div>
                <div className="add-control col-11 col-md-9">
                  <div className="form-group flex-baseline">
                    <div className="flex-baseline">
                      {/* <span className="add-icon"></span> */}
                      <textarea
                        rows={3}
                        className="add-item"
                        placeholder="Enter task,ideas..."
                        ref={inputRef}
                        onChange={() => {
                          setErrorMessage(false);
                        }}
                      />
                    </div>
                    <div
                      className="add button"
                      onClick={() => {
                        addToList();
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
              </>
            )}
            {errorMessage && (
              <div className="err text-danger">
                <RiErrorWarningLine
                  style={{ width: '1.1em', height: '1.1em' }}
                />
                &nbsp;Oops! Please, enter name item
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ToDoList);
