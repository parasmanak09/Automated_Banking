import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/transfer.css';
import { jwtDecode } from 'jwt-decode';

export default function Transfer() {
    if (global.ID === undefined) {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            global.ID = decodedToken.user.id;
        }
    }

    const [formData, setFormData] = useState({
        email: "",
        amount: "",
        password: "",
        from: global.ID
    });
    const [alertMessage, setAlertMessage] = useState("");

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!formData.email || !formData.amount || !formData.password) {
            setAlertMessage("Please fill in all fields");
            return;
        }

        // Check if email includes '@' and auto-append '@cuchd.in' if needed
        let email = formData.email;
        if (!email.includes('@')) {
            email += '@cuchd.in';
        }

        // Proceed with the submission
        const confirmed = window.confirm(`Are you sure you want to send ${formData.amount} to ${email}?`);
        if (!confirmed) {
            return; // Exit the function if the user cancels
        }

        try {
            const amount = parseFloat(formData.amount);
            const response = await fetch('http://localhost:9015/api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: formData.from,
                    to: email,
                    money: amount,
                    password: formData.password
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                setAlertMessage(errorMessage.message);
            } else {
                setAlertMessage("Transaction successful");
                // Reset form fields
                setFormData({
                    email: "",
                    amount: "",
                    password: "",
                    from: global.ID
                });
                // Clear alert message after 2 seconds
                setTimeout(() => {
                    setAlertMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage("Failed to process transaction");
        }
    };

    // Function to handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar />
            <Background />
            <div className="wrapper101" style={{ margin: "20px 0  0 200px", width: "85vw", height: "95vh", border: "3px solid rgba(43, 43, 43, 0.568)", borderRadius: "15px", postion: "relative", zIndex: "400" }}>

                <form onSubmit={handleSubmit} style={{ width: "40%" }}>
                    <h1> Send Money to ClassMate</h1>
                    <input className="form-control" type="text" placeholder="Enter Receiver's UID" aria-label="Name" name="email" value={formData.email} onChange={handleChange} />
                    <input className="form-control" type="text" placeholder="Enter Amount" aria-label="Email" name="amount" value={formData.amount} onChange={handleChange} />
                    <input type="password" className="form-control" placeholder="Enter Password" aria-label="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit" className="btn btn-primary btn-behan">Continue</button>
                </form>
                {alertMessage && (
                    <div className="alert alert-primary mt-3" role="alert" style={{width:"40%"}}>
                        {alertMessage}
                    </div>
                )}
            </div>
        </>
    );
}
