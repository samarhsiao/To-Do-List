import { useEffect, useState } from 'react';
import { ApiResponse } from '../types/apiResponse';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BiSearchAlt, BiX } from 'react-icons/bi';
import { ToDoItem } from '../types/toDoItem';

type Props = {
  setAllLists: (allLists: ToDoItem[]) => void;
  getAllLists: () => void;
  setIsLoading: (isLoading: boolean) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
};
const Searchbar = ({
  setAllLists,
  getAllLists,
  setIsLoading,
  keyword,
  setKeyword,
  isSearching,
  setIsSearching,
}: Props) => {
  const [isComposition, setIsComposition] = useState<boolean>(false);

  function checkComposition(type: string): void {
    if (type === 'compositionend') return setIsComposition(false);
    setIsComposition(true);
  }

  const getSearchResult = async (value: string) => {
    if (isComposition || !keyword) return;
    setIsLoading(true);

    try {
      const { status, data } = await axios.get<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/v1/todos/search?keyword=${value}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 200) {
        setIsLoading(false);

        if (data.data) {
          setAllLists(data.data);
          if (data.data.length === 0) {
            setIsSearching(true);
          }
        }
      } else if (status === 404) {
        setIsLoading(false);
        setIsSearching(true);
        setAllLists([]);
      }
    } catch (err) {
      setIsLoading(false);
      setIsSearching(true);
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
    if (keyword) return;
    getAllLists();
    setIsSearching(false);
  }, [keyword]);

  return (
    <>
      <div className="searchBar col-11 col-md-9 mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search todo"
          value={keyword}
          onCompositionStart={(e) => checkComposition(e.type)}
          onCompositionEnd={(e) => checkComposition(e.type)}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              getSearchResult(keyword);
            }
          }}
        />
        <div
          className={`search-button ${
            !isComposition && keyword ? 'clear-border' : ''
          }`}
        >
          {!isComposition && keyword ? (
            <BiX
              style={{ width: '1.3rem', height: '1.3rem', fill: '#771011' }}
              onClick={() => {
                setKeyword('');
              }}
            />
          ) : (
            <BiSearchAlt
              style={{ width: '1.3rem', height: '1.3rem', fill: '#4dff4d' }}
              className="search-icon"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
