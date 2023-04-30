import { BsPersonFill,BsPersonCircle } from 'react-icons/bs';

type Props = {
  setShowLoginForm: (showLoginForm: boolean) => void;
  showLoginForm:boolean
};
export default function MemberAvatar({ showLoginForm,setShowLoginForm }: Props) {
  return (
    <>
      <>
        <BsPersonCircle
          style={{ width: '1.3rem', height: '1.3rem', fill: '#ffffff' }}
          onClick={()=>{
            setShowLoginForm(!showLoginForm);
          }}
        />
      </>
    </>
  );
}
