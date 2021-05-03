import React, { useState, useEffect }from "react";
import firebase from '../../../config/Firebase';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [welcomeText, setWelcomeText] = useState("Selamat Datang");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const onsubmit = () => {
        console.log("Button pressed");
        const data = {
            email: email,
            password: password,
        };
        // console.log(data);
        // setWelcomeText("welcome!!!");
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => history.push("/"))
        .catch(error => console.log("Error", error));
    };
    
    useEffect(() => {
        console.log("component did mount");
        setTimeout(() => {
            setWelcomeText("Welcome");
        }, 3000);
    }, []);

    useEffect(() => {
        console.log("component did update");
    }, [welcomeText] );

    console.log("render component");

  return (
   <div className="container mt-5">
     <h1>Welcome</h1>
     <h3 className="mt-5" >Login</h3>
     <div className="col-5">
     <p className="mt-5">Email</p>
     <input className="form-control" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)}/>
     <p className="mt-4">Password</p>
     <input className="form-control" placeholder="Masukkan password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
     </div>
     <br></br>
     <br></br>
     <button type="button" onClick={onsubmit} className="btn btn-danger btn-sm">Submit</button>
   </div>
   );
};

export default Login;