import { MdOutlinePerson2, MdOutlineLockPerson } from 'react-icons/md';

type Props = {
  setShowLoginForm: (showLoginForm: boolean) => void;
};
export default function ModalOfLogin({ setShowLoginForm }: Props) {
  return (
    <div className="loginForm-wrapper col-lg-5 col-md-7 col-12 pb-3 pt-5">
      <form>
        <div className="wrap-input flex-baseline justify-content-start">
        <span>
            <MdOutlinePerson2 style={{ width: '1.8rem', height: '1.8rem' }} />
          </span>
          <input
            className=""
            type="text"
            name="username"
            placeholder="Email"
          />
        </div>

        <div className="wrap-input flex-baseline justify-content-start">
        <span>
            <MdOutlineLockPerson
              style={{ width: '1.8rem', height: '1.8rem' }}
            />
          </span>
          <input type="password" placeholder="Password" />   
        </div>
        {/* <div className="wrap-login-form-btn">
          <button className="login-form-btn">Login</button>
        </div> */}
      </form>
    </div>
  );
}
