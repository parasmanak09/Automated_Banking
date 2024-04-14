import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/search.css';
import { jwtDecode } from 'jwt-decode';

// Move the filter functions outside the component function
const filterDeposits = (transactionsData) => {
    return transactionsData.filter(transaction => transaction.type === 'deposit');
};

const filterWithdrawals = (transactionsData) => {
    return transactionsData.filter(transaction => transaction.type === 'withdraw');
};

export default function Transactions() {
    const [transactionsData, setTransactionsData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('No authentication token found');
                }

                const decodedToken = jwtDecode(authToken);
                const userID = decodedToken.user.id;

                const response = await fetch(`http://localhost:9015/api/dataget/${userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const responseJson = await response.json();

                if (responseJson._id === userID) {
                    // Parse the JSON response and set the user data state
                    setUserData(responseJson);
                    // Extract transactions data and set state
                    setTransactionsData(responseJson.transactions);
                } else {
                    // Handle errors if the response is not successful
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Background />
            <div className="tau" style={{ width: "80vw", height: "100vh", marginLeft: "200px", paddingTop: "50px" }}>
                <div className="card shadow ">
                    <div className="card-body text-truncate" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h2 className="card-title">Transactions</h2>
                        <div className="row height d-flex justify-content-center align-items-center">
                            <div className="col-md-8">
                                <div className="search">
                                    <input type="text" className="form-control" placeholder="Search Transactions here...." />
                                    <button className="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body" style={{ marginTop: "-25px", width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <p>All</p>
                        <p style={{ marginLeft: "300px" }}>Expenses</p>
                        <p>Income</p>
                    </div>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div className="transactions-container" style={{ width: "25vw", height: "80vh" }}>

                            {transactionsData
                                // Sort transactions in descending order based on timestamp
                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                // Map over the sorted transactions and render each transaction
                                .map(transaction => (
                                    <div key={transaction._id} className="transactions" style={{ marginTop: "-15px", background: "rgba(255, 255, 255, 0.192)", backdropFilter: "blur(10px)", borderRadius: "15px", border: "1px solid rgba(221, 221, 221, 0.568)" }}>
                                        {/* Render transaction details */}
                                        <p style={{ marginBottom: "-6px", textAlign: "centre" }}>  __________________________________________________ </p>
                                        <div style={{ marginTop: "4px", paddingLeft: "14px" }}>
                                            <div className="toppermaster" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <p style={{ marginBottom: "-2px", fontWeight: "bold" }}>Id: {transaction.transaction_id}</p>
                                                <div className="moneylane" style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                    <p style={{ color: transaction.type === 'deposit' ? 'green' : (transaction.type === 'withdraw' ? 'red' : 'inherit'), fontWeight: "bold" }}>
                                                        {transaction.type.toUpperCase()}
                                                    </p>
                                                    <p style={{ color: transaction.type === 'deposit' ? 'green' : (transaction.type === 'withdraw' ? 'red' : 'inherit'), marginTop: "-20px", fontWeight: "bold" }}>
                                                        {transaction.type === 'withdraw' ? '-' : '+'} INR {Math.abs(transaction.money)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p style={{ marginTop: "-40px", fontWeight: "bold" }}>{transaction.type === 'deposit' ? 'From' : 'To'}: {transaction.type === 'deposit' ? transaction.from : transaction.to}</p>
                                            <p style={{ textAlign: "right", marginRight: "14px", marginTop: "-18px" }}>{new Date(transaction.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="deposit-container" style={{ width: "25vw", height: "80vh" }}>
                            {/* Render deposits */}
                            {filterDeposits(transactionsData).map(deposit => (
                                <div key={deposit._id} className="transactions" style={{ marginTop: "-15px", background: "rgba(255, 255, 255, 0.192)", backdropFilter: "blur(10px)", borderRadius: "15px", border: "1px solid rgba(221, 221, 221, 0.568)" }}>
                                    {/* Render deposit transaction */}
                                    <p style={{ marginBottom: "-6px", textAlign: "centre" }}>  __________________________________________________ </p>
                                    <div style={{ marginTop: "4px", paddingLeft: "14px" }}>
                                        <div className="toppermaster" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <p style={{ marginBottom: "-2px", fontWeight: "bold" }}>Id: {deposit.transaction_id}</p>
                                            <div className="moneylane" style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <p style={{ color: deposit.type === 'deposit' ? 'green' : (deposit.type === 'withdraw' ? 'red' : 'inherit'), fontWeight: "bold" }}>
                                                    {deposit.type.toUpperCase()}
                                                </p>
                                                <p style={{ color: deposit.type === 'deposit' ? 'green' : (deposit.type === 'withdraw' ? 'red' : 'inherit'), marginTop: "-20px", fontWeight: "bold" }}>
                                                    {deposit.type === 'withdraw' ? '-' : '+'} INR {Math.abs(deposit.money)}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={{ marginTop: "-40px", fontWeight: "bold" }}>{deposit.type === 'deposit' ? 'From' : 'To'}: {deposit.type === 'deposit' ? deposit.from : deposit.to}</p>
                                        <p style={{ textAlign: "right", marginRight: "14px", marginTop: "-18px" }}>{new Date(deposit.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="withdraw-container" style={{ width: "25vw", height: "80vh" }}>
                            {/* Render withdrawals */}
                            {filterWithdrawals(transactionsData).map(withdrawal => (
                                <div key={withdrawal._id} className="transactions" style={{ marginTop: "-15px", background: "rgba(255, 255, 255, 0.192)", backdropFilter: "blur(10px)", borderRadius: "15px", border: "1px solid rgba(221, 221, 221, 0.568)" }}>
                                    {/* Render withdrawal transaction */}
                                    <p style={{ marginBottom: "-6px", textAlign: "centre" }}>  __________________________________________________ </p>
                                    <div style={{ marginTop: "4px", paddingLeft: "14px" }}>
                                        <div className="toppermaster" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <p style={{ marginBottom: "-2px", fontWeight: "bold" }}>Id: {withdrawal.transaction_id}</p>
                                            <div className="moneylane" style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <p style={{ color: withdrawal.type === 'deposit' ? 'green' : (withdrawal.type === 'withdraw' ? 'red' : 'inherit'), fontWeight: "bold" }}>
                                                    {withdrawal.type.toUpperCase()}
                                                </p>
                                                <p style={{ color: withdrawal.type === 'deposit' ? 'green' : (withdrawal.type === 'withdraw' ? 'red' : 'inherit'), marginTop: "-20px", fontWeight: "bold" }}>
                                                    {withdrawal.type === 'withdraw' ? '-' : '+'} INR {Math.abs(withdrawal.money)}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={{ marginTop: "-40px", fontWeight: "bold" }}>{withdrawal.type === 'deposit' ? 'From' : 'To'}: {withdrawal.type === 'deposit' ? withdrawal.from : withdrawal.to}</p>
                                        <p style={{ textAlign: "right", marginRight: "14px", marginTop: "-18px" }}>{new Date(withdrawal.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
