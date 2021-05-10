import React, {useState, useEffect} from 'react';
import Navbar from '../../molecules/Navbar';
import firebase from '../../../config/Firebase';

const Dashboard = () => {

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [users, setUsers] = useState([]);
    const [button, setButton] = useState("Save");
    const [selectedUsers, setSelectedUsers] = useState({});

    useEffect(() => {
        firebase.database()
        .ref("adminUsers")
        .on("value", (res) => {
           if(res.val()){
               //Ubah menjadi array object
               const rawData = res.val();
               const productArr = [];
               Object.keys(rawData).map(item => {
                   productArr.push({
                       id: item,
                       ...rawData[item],
                   });
               });
               setUsers(productArr);
           }
        });
    }, []);

    const resetForm = () => {
        setFullName("");
        setAge("");
        setAddress("");
        setPhoneNumber("");
        setButton("Save");
        setSelectedUsers({});
    };

    const onSubmit = () => {
        const data = {
            fullName: fullName,
            age: age,
            address: address,
            phoneNumber: phoneNumber,
        };
        if(button === 'Save'){
            //Insert
            firebase.database()
            .ref('adminUsers')
            .push(data);
        } else {
            //Update
            firebase.database().ref(`adminUsers/${selectedUsers.id}`).set(data);
        }
       resetForm();
    };

    const onUpdateData = (item) => {
        setFullName(item.fullName);
        setAge(item.age);
        setAddress(item.address);
        setPhoneNumber(item.phoneNumber);
        setButton("Update");
        setSelectedUsers(item);
    };

    const onDeleteData = (item) => {
        //delete
        firebase.database()
        .ref(`adminUsers/${item.id}`)
        .remove();
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-4">
            <h3>Dashboard Admin</h3>
            <div className="col-4">
             <p className="mt-2">FullName</p>
             <input className="form-control" placeholder="Type your fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} /> 
             <p className="mt-2">Age</p>
             <input className="form-control" placeholder="Type your age" value={age} onChange={(e) => setAge(e.target.value)} />
             <p className="mt-2">Address</p>
             <input className="form-control" placeholder="Type your address" value={address} onChange={(e) => setAddress(e.target.value)} />
             <p className="mt-2">Phone</p>
             <input className="form-control" placeholder="Type your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
             <br/>
             <button className="btn btn-primary text-dark" onClick={onSubmit}>{button}</button>
            {button === "Update" && (
                 <button className="btn btn-secondary" onClick={resetForm}>Cancel Update</button>
            )}
            </div>
            <hr/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>FullName</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fullName}</td>
                            <td>{item.age}</td>
                            <td>{item.address}</td>
                            <td>{item.phoneNumber}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => onUpdateData(item)}>Update</button>
                                <button className="btn btn-danger" onClick={() => onDeleteData(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>  
        </div>
        </div>
    );
};

export default Dashboard;
