import { useState } from 'react';

const Searchbar = () => {

  const [keyword, setKeyword] = useState<string>();
  const [isComposition, setIsComposition] = useState<boolean>(false);
  
  function checkComposition(type:string):void {
    if (type === "compositionend") return setIsComposition(false);
    setIsComposition(true);
  }

  const getSearchResult = () => {
    if(isComposition)return
    //TODO: request api `${process.env.REACT_APP_API_URL}/api/todos/:id`
  }
  return (
    <>
      <div className="searchBar col-11 col-md-9 mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search todo"
          value={keyword}
          onCompositionStart={(e) => checkComposition(e.type)}
          onCompositionEnd={(e) => checkComposition(e.type)}
          onChange={
            (e)=>{
                setKeyword(e.target.value)
            }
          }
        />
      </div>
    </>
  );
};

export default Searchbar;
