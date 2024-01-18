import React, { useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Configs from '../Configs';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token ='sBz7jwGircK3D9wtIhsCf89Ju6dgPVpcYtmkfNjMBzIkN9AcPh';
    // const token = Configs();
    // console.log(token);

    const validate=()=>{
        let result = true;
        if (email === '' || email === null){
            result= false;
            toast.error('Please Enter Email')
        }
        if (name === '' || name === null){
            result= false;
            toast.error('Please Enter Your Name')
        }
        if (password === '' || password === null){
            result= false;
            toast.error('Please Enter Password')
        }
        return result;
    }
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
      
        if (!validate()) {
          return false;
        }
      
        let registrationValue = { name, email, password, token };
      
        try {
          const response = await fetch("http://127.0.0.1:8080/auth/register_user", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(registrationValue)
          });
      
          if (response.status === 201) {
            const data = await response.json();
            const message = data.message;
            toast.success(`Success: ${message}`);
            navigate("/login");
          } else if (response.status === 401) {
            toast.error('Unauthorized: Invalid token');
          } else {
            toast.error('Registration failed, Something went wrong');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          toast.error('Registration failed, Something went wrong');
        }
      };


    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     if (!validate()) {
    //         return false;
    //       }
          
    //     let registrationValue = {name, email,password, token};
        
    //     fetch("http://127.0.0.1:8080/auth/register_user", {
    //         method: "POST",
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(registrationValue)
    //         })
    //         .then((res) => {
    //             if (!res.ok) {
    //                 toast.error('Registration failed, Something went wrong')
    //                 // throw new Error('Registration failed');
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             const message = data.message;
    //             toast.info(`${message}`);
    //             navigate("/login");
                
                
    //         })
    // }

    // const handleRegister = async () => {
    //     if (!validate()) {
    //         return false;
    //       }
          
    //     let registrationValue = {name, email,password, token};
        
    //     // try {
    //       const response = await fetch("http://127.0.0.1:8080/auth/register_user", {
    //         method: "POST",
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(registrationValue)
    //       });
      
    //     //   if (response.status !== 201) {
    //     //     throw new Error('Registration failed');
    //     //   }
      
    //       const data = await response.json();
    //       const message = data.message;
    //       console.log(message);
    //       console.log(response.status);

    //       if (response.status === 201){
    //         toast.success(`Success: ${message}`);
    //         navigate("/login");
    //       }
    //       if(response.status === 401){
    //         toast.info(`${message}`);
    //       }
          
    //     // } catch (error) {
    //       toast.error('Registration failed, Something went wrong');
    //     // }
    //   };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleRegister}>
                    <div className="card">
                        <div className="card-header">
                            <h2> Register </h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <label>Name <span className="errmsg"> *</span></label>
                                </div>
                                <div className="col-9">
                                    <input value={name} onChange={e=>setName(e.target.value)} name="name" type="text" className="form-control" />
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col-3">
                                    <label>E-mail <span className="errmsg"> *</span></label>
                                </div>
                                <div className="col-9">
                                    <input value={email} onChange={e=>setEmail(e.target.value)} name="email" type="email" className="form-control" />
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col-3">
                                    <label>Password <span className="errmsg"> *</span></label>
                                </div>
                                <div className="col-9">
                                    <input value={password} onChange={e=>setPassword(e.target.value)} name="password" type="password" className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <h4>
                                Already Registered?{' '}
                                <Link to="/login" className="link-to-login">
                                    Login
                                </Link>
                            </h4>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
}
export default Register;