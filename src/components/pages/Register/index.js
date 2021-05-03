import React, { useState } from 'react';
import firebase from '../../../config/Firebase';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const onSubmit = () => {

        const data = {
            email: email,
            fullname: fullname,
        };


      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Simpan ke Realtime Database
        const userId = userCredential.user.uid;
        firebase.database()
        .ref('users/' + userId)
        .set(data);

        setFullname("");
        setEmail("");
        setPassword("");
        //Redirect ke Halaman Login
        history.push("/login");
    })
      .catch((error) => {
      console.log(error);
      //Tampilkan pesan error
    });

 };

    return (
    <div className="container mt-5">
      <h3>Register</h3>
      <div className="col-5">
      <p className="mt-5">Nama Lengkap</p>
      <input className="form-control" placeholder="Masukan nama lengkap" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
      <p className="mt-4">Email</p>
      <input className="form-control" placeholder="Masukan email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <p className="mt-4">Password</p>
      <input className="form-control" placeholder="Masukan nomor"type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <br></br>
      <br></br>
      <button type="button" onClick = {onSubmit} className="btn btn-warning btn-sm">Register New User</button>
    </div>
    );
}

export default Register;