import React from 'react';
import usericon from '../../asset/usericon.png';
import { getUser, getAllUsers } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { UserName } from '../../component/userName';
// import Cookies from "universal-cookie";
import { LogoutButton } from '../../component/Logout';
import { LoginButton } from '../../component/Login';
import { useHistory } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import Swal from "sweetalert2"
import s from './LoginBar.module.css';

const LoginRegister = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	const history = useHistory();
	// const cookies = new Cookies();

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
                
                    // dispatch(Logout());
                    history.push("/home");
                } else Logout();{
                Swal.fire(
                    'Log out succesfully!',
                    '',
                    'success'
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

	
	useEffect(async () => {
		await dispatch(getAllUsers());
		await dispatch(getUser(1));
	}, []);
	return (
		<div className={s.Login}>
			{/* {user.username ? ( */}
			<div className={s.Login}>
				<img src={usericon} onClick={() => loginWithRedirect()} alt='' height='25px' />
				{}

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
                                             <div
                                                 onClick={
                                                         item.href
                                                     }
                                                >
                                                     <div ></div>
                                                     <div>
                                                            <p >
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
				<UserName/>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
				<h3 className={s.h3}>{user.username}</h3>
			</div>
			{/* ) : (
				'Esto no existe'
			)} */}
		</div>
	);
};

export default LoginRegister;
