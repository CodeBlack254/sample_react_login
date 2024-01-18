import React, { useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import token from '../Configs';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token ='sBz7jwGircK3D9wtIhsCf89Ju6dgPVpcYtmkfNjMBzIkN9AcPh'; 
    // const Apitoken = token;
    // console.log(token);

    const validate=()=>{
        let result = true;
        if (email === '' || email === null){
            result= false;
            toast.error('Please Enter Email')
        }
        if (password === '' || password === null){
            result= false;
            toast.error('Please Enter Password')
        }
        return result;
    }
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
      
        if (!validate()) {
          return false;
        }
      
        let registrationValue = { email, password, token };
      
        try {
          const response = await fetch("http://127.0.0.1:8080/auth/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(registrationValue)
          });
            const data = await response.json();
            const message = data.message;

          if (response.status === 200) {            
            toast.success(`Success: ${message}`);
            navigate("/home");
          } else if (response.status === 401) {
            toast.error(`Unauthorized :${message}`);
          } else if (response.status === 404) {
            toast.error('User Does not Exist');
          }else{
            toast.error('Login failed, Something went wrong')
          }
        } catch (error) {
          console.error('Error during login:', error);
          toast.error('Login failed, Something went wrong');
        }
      };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h2> Login </h2>
                        </div>
                        <div className="card-body">
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
                                New User?{' '}
                                <Link to="/register" className="link-to-login">
                                    Register
                                </Link>
                            </h4>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
}
export default Login;