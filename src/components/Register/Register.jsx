import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Root/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        // reset error and Success
        setRegisterError('');
        setSuccess('');

        if(password.length < 6){
            setRegisterError('Password should be at least 6 characters or more longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Your password should have at least one upper case characters.')
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions !')
            return;
        }
        
        // create user

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user) ;
            setSuccess('User Created Successfully.')

            // update Profile

            updateProfile(result.user, {
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then( () => console.log('profile updated'))
            .catch()

            // set verification email : 
            sendEmailVerification(result.user)
            .then(() =>{
                alert('Please check your email and verify your account')
            })
        })
        .catch(error => {
            console.error(error);
            setRegisterError(error.message);
        })
    }
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className=" text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className=" mb-4 w-full px-4 py-2 bg-slate-300 " placeholder="Your Name" type="text" name="name" id="" required />
                    <br />
                    <input className=" mb-4 w-full px-4 py-2 bg-slate-300 " placeholder="Email Address" type="email" name="email" id="" required />
                    <br />

                    <div className=" relative">
                        <input 
                            className=" mb-4 w-full  px-4 py-2 bg-slate-300 " 
                            placeholder="Password" 
                            type={ showPassword ? "text" : "password" }
                            name="password" 
                            id="" required />
                        <span className=" absolute top-3 right-2" onClick={ () => setShowPassword(!showPassword)}>
                        
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                        </span>
                    </div>
                    <br />
                    <div className=" mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className=" ml-2" htmlFor="terms">Accept our <a href="#">Terms and Conditions</a></label>
                    </div>
                    <br />
                    <input className=" mb-4 w-full btn btn-secondary" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className=" text-red-700">{registerError}</p>
                }
                {
                    success && <p className=" text-green-700">{success}</p>
                }
                <p className=" ml-5 mb-5">Already Have an Account ? Please <Link to="/Login"> <span className=" font-semibold text-green-700">Log in</span> </Link> </p>

                
                
            </div>
        </div>
    );
};

export default Register;