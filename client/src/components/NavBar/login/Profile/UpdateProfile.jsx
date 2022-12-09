import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import {updateUser} from "../../../../redux/actions/index"


const Validate = (input)=>{
    let errors = {}
    let expreg = /[.*+\-?^${}()|[\]\\/]/;
    let regexURL =
		/((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;
    let regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
    let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if(!input.firstname){
        errors.firstname = "Introduce a firstname"
    }else if (expreg.test(input.firstname)) {
		errors.firstname = 'Name yourself properly!';
	}

    else if(!input.lastname){
        errors.lastname = "Introduce a lastname"
    }else if (expreg.test(input.lastname)) {
		errors.lastname = 'Name yourself properly!';
	}

    else if(!input.password){
        errors.password = "Introduce a password"
    }else if (!regexPassword.test(input.password)) {
		errors.password = 'The password must contain: 8-16 characters and 1 number,lowercase letter, uppercase letter and non alphanumeric character ';
	}

    else if(input.confirm_password !== input.password){
        errors.confirm_password = "Both passwords must be the same"
    }

    else if(!input.email){
        errors.email = "Introduce an email"
    }else if (!regexEmail.test(input.email)) {
		errors.email = 'Introduce your email properly!';
	}

    else if(!input.username){
        errors.username = "Introduce an username"
    }

    const sendButton = document.getElementById('sendButtom');

	if (Object.entries(errors).length) {
		sendButton.disabled = true;
	} else {
		sendButton.disabled = false;
	}

    return errors

}



const UpdateProfile = (props)=>{

    const userNow = JSON.parse(localStorage.getItem("userInfo"))
    const dispatch = useDispatch()
    const history = useHistory()

    const [input, setInput] = useState({
        firstname:userNow.name.split(" ",1).join(),
        lastname:userNow.name.split(" ",).slice(1).join(),
        password:"",
        confirm_password:"",
        email:userNow.email,
        profile_image:userNow.picture,
        username: userNow.username
    })
    const [errors, setErrors] = useState({
        firstname:"",
        lastname:"",
        password:"",
        confirm_password:"",
        email:"",
        profile_image:"",
        username:""
    })
    const [loading, setLoading]= useState(false)

    const introduceData = (event)=>{
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value

        setInput({...input,[name]:value})
        setErrors(Validate({...input,[name]:value}))
    }

    // Cloudinary ////////////////////////////////////////////////////////

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'LatamCom');
		setLoading(true);
		const res = await fetch(
			'https://api.cloudinary.com/v1_1/drruxw6zi/image/upload',
			{
				method: 'POST',
				body: data,
			},
		);
		const file = await res.json();
		setInput({ ...input, profile_image: file.secure_url });
		setLoading(false);
		setErrors(Validate({ ...input, profile_image: file.secure_url }));
	};
	///////////////////////////////////////////////////////////////////////

    //Delete New Image /////////////////////

    const deleteNewImage = (e)=>{
        e.preventDefault()
        setInput({...input, profile_image:userNow.picture})
    }
    ////////////////////////////////////////

    // Uptade User //////////////////////////////
	const submitData = (event) => {
		event.preventDefault();
		try {
            const newDates = {
                firstname:input.firstname,
                lastname:input.lastname,
                password:input.password,
                email:input.email,
                profile_image:input.profile_image,
                username:input.username,
                id: userNow.id
            }
            
			dispatch(updateUser(newDates))
            .then(console.log("nuevos datos:",userNow))
            .then(history.push('/profile/success'))
		} catch (error) {
			alert(
				error.message
			);
		}
	};
	/////////////////////////////////////////////
   
    if(!userNow){
        return(
            <div><p>Loading...</p></div>
        )
    }
    else{

        return(
    
            <div>
                <p>
                   Update User
                </p>
                <div>
                    <form onSubmit={submitData}>
    
                        <div>
                            <label>Firstname</label>
                            <input 
                                name="firstname" 
                                value={input.firstname}
                                autoComplete='off' 
                                onChange={introduceData}  />
                            {errors.firstname && <p>{errors.firstname}</p> }
                        </div>
    
                        <div>
                            <label>Lastname</label>
                            <input 
                                name="lastname" 
                                value={input.lastname}
                                autoComplete='off' 
                                onChange={introduceData}  />
                            {errors.lastname && <p>{errors.lastname}</p> }
                        </div>
    
                        <div>
                            <label>Password</label>
                            <input 
                                name="password" 
                                value={input.password}
                                autoComplete='off' 
                                onChange={introduceData}  />
                            {errors.password && <p>{errors.password}</p> }
                        </div>
    
                        <div>
                            <label>Confirm password</label>
                            <input 
                                name="confirm_password" 
                                value={input.confirm_password}
                                autoComplete='off' 
                                onChange={introduceData}  />
                            {errors.confirm_password && <p>{errors.confirm_password}</p> }
                        </div>
    
                        <div>
                            <label>Email</label>
                            <input  
                                name="email" 
                                value={input.email}
                                autoComplete='off' 
                                onChange={introduceData}  />
                            {errors.email && <p>{errors.email}</p> }
                        </div>
    
                        {userNow.picture? (
                            <div>
                                <p>Actual image</p>
                                <img src={userNow.picture} style={{ width: '300px' }} alt="img" />
                            </div>
                        ) : (
                            <div>
                                <p>No current image</p>
                            </div>
                        )}
    
                        <div>
                            <label>Profile Image</label>
                            <p>(this will replace the current image)</p>
                            <input 
                                type="file" 
                                name="file" 
                                autoComplete='off'
                                onChange={uploadImage}  />
                            {loading ? (
                                    <h4>Uploading image...</h4>
                                ) : (
                                    input.profile_image!== null && userNow.picture === input.profile_image.toString()? (
                                        <div>
                                            <p>You will keep the same picture</p>
                                        </div>
                                    ) : <img src={input.profile_image} style={{ width: '300px' }} alt=''></img>
                                    
                                )}
                        </div>
    
                        <div>
                            {input.profile_image?(
                                <button onClick={deleteNewImage}>Delete new image</button>
                            ):""}
                            
                        </div>
    
                        <div>
                            <label>Username</label>
                            <input 
                                name="username" 
                                value={input.username}
                                autoComplete='off' 
                                onChange={introduceData}  />
                            {errors.username && <p>{errors.username}</p> }
                        </div>
    
                        <div>
                            <button type="submit" id='sendButtom' disabled>SEND</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default UpdateProfile