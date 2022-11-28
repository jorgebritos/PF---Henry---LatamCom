/* eslint-disable no-lone-blocks */
import React from 'react';
import usericon from '../../asset/usericon.png';
import { useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { UserName } from '../../components/login/userName';
import { useHistory } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import Swal from "sweetalert2"
import s from './LoginBar.module.css';

const LoginRegister = () => {
  const user = useSelector((state) => state.user);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const history = useHistory();
  // const reload = document.getElementById('Log Out');

  const userConfig = () => {
    history.push("/profile");
  };



  const Logout = () => {
    Swal.fire({
      title: 'Sure about loging out?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        // dispatch(Logout());
        history.push("/home");
        Swal.fire(
          'Log out succesfully!',
          '',
          'success'
        )
      } else {
        // logout();
        history.push("/home");
        Swal.fire(
          'Log out canceled!',
          '',
          'warning'
        )

      }
    })
  };

  const solutions = [
    {
      name: "Configuration",
      href: userConfig,
    },
    {
      name: "Log Out",
      href: Logout,
    },
  ];

//	useEffect(async () => {
//		await dispatch(getAllUsers());
//		await dispatch(getUser(1));
//	}, []);

  return (
    <div className={s.Login}>
      {/* {user.username ? ( */}
      <div className={s.Login}>
        <img src={usericon} alt='' height='25px' />
        {isAuthenticated ? (
          <>
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <div>
                      <p>
                        {user?.name}
                      </p>
                    </div>
                  </Popover.Button>
                  <Transition
                  >
                    <Popover.Panel>
                      <div >
                        <div >
                          {solutions.map(
                            (item) => (
                              <div key={item.name}
                                onClick={
                                  item.href
                                }
                              >
                                <div ></div>
                                <div>
                                  <p style={{ cursor: "pointer" }}>
                                    {
                                      item.name
                                    }
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <UserName />
          </>
        ) : (
          <p onClick={() => loginWithRedirect()} style={{"cursor": "pointer"}}>Login</p>
        )}
        <h3 className={s.h3}>{user.username}</h3>
      </div>
    </div>
  );
};

export default LoginRegister;
