import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../components/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Background.js'; // Import JS Background File
import Background from '../components/Background.js';

import { jwtDecode } from 'jwt-decode';

export default function Home() {
    const [userData, setUserData] = useState(null); // State to store the fetched user data
    const [totalVaults, setTotalVaults] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [latestTransactions, setLatestTransactions] = useState([]);

    // Check if global ID is undefined and decode the JWT token
    if (global.ID === undefined) {
        const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            global.ID = decodedToken.user.id;
        }
    }


    // Function to calculate total income and expense
    const calculateIncomeAndExpense = () => {
        let income = 0;
        let expense = 0;

        // Iterate over transactions array
        userData.transactions.forEach(transaction => {
            // Check transaction type
            if (transaction.type === "deposit") {
                // If deposit, add amount to totalIncome
                income += transaction.money;
            } else if (transaction.type === "withdraw") {
                // If withdraw, add amount to totalExpense
                expense += transaction.money;
            }
        });

        // Set totalIncome and totalExpense states
        setTotalIncome(income);
        setTotalExpense(expense);
    };

    // Function to get latest 5 transactions
    const getLatestTransactions = () => {
        if (userData) {
            // Sort transactions based on timestamp in descending order
            const sortedTransactions = userData.transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            // Select latest 5 transactions
            const latest5 = sortedTransactions.slice(0, 5);
            // Set latest transactions state
            setLatestTransactions(latest5);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            let response = await fetch(`http://localhost:9015/api/dataget/${global.ID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            });

            const responseJson = await response.json();

            if (responseJson._id === global.ID) {
                // Parse the JSON response and set the user data state
                setUserData(responseJson);

                // Initialize variables to store total number of vaults and total balance
                // Update totalVaults after fetching data
                const extractedTotalVaults = responseJson.vault.length;
                setTotalVaults(extractedTotalVaults);
                

                // Calculate total balance
                let balanceTotal = 0;
                responseJson.vault.forEach(vault => {
                    balanceTotal += vault.balance;
                });
                setTotalBalance(balanceTotal);

            } else {
                // Handle errors if the response is not successful
                console.error('Failed to fetch user data:', response.statusText);
            }
        };

        // Call the loadData function when the component mounts
        loadData();
    }, []);

    useEffect(() => {
        if (userData) {
            calculateIncomeAndExpense();
            getLatestTransactions();
        }
    }, [userData]);

    return (
        <div >
            <Navbar />
            <Background />
            {userData && (
                <div className="great" style={{ boxSizing: "border-box", position: "relative" }} >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h1 style={{ paddingBottom: "25px" }}>Dashboard</h1>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", marginRight: "5vw" }}>
                            <h1 style={{ paddingRight: "10px" }}>Hi, {userData.name.toUpperCase()}</h1>
                            <img style={{}} src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" class="image--cover" />
                        </div>
                    </div>
                    <div class="tau">
                        <div class="master101" style={{ width: "55%", height: "20%" }} >
                            <div class="row " style={{ paddingBottom: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", position: 'relative' }}>
                                <div className="card shadow  col-sm-6 mb-3 mb-sm-0" style={{ position: 'relative', top: "0" }}>
                                    <div class="card-body">
                                        <h6 class="card-title">Total Balance</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                                        <h4 class="card-text">INR {userData.balance} </h4>
                                        <div class="row">
                                            <div class="col-sm-6 mb-3 mb-sm-0">
                                                <div class="card" style={{ border: "none" }}>
                                                    <div class="card-body">
                                                        <p class="card-title">Income</p>
                                                        <p>INR {totalIncome} </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="card" style={{ border: "none" }}>
                                                    <div class="card-body">
                                                        <p class="card-title" >Expense</p>
                                                        <p>INR {totalExpense} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="card shadow  text-center col-sm-6 mb-3 mb-sm-0" style={{ marginLeft: "3vw", height: "31.6vh", width: '20rem', position: "absolute", right: "0" }}>
                                    <div class="card-body">
                                        <h6 class="card-title">Total Vaults</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                                        <h4 class="card-text">{totalVaults ? totalVaults : 0 }</h4> 

                                        <p style={{ paddingTop: "15px", marginBottom: "-5px" }}>Vault Balance</p>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                                        <h4 class="card-text" >INR {totalBalance ? totalBalance : 0} </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{ paddingTop: "20px", }}>
                            <div class="card shadow  " style={{ width: "55.8%", marginLeft: "1px" }}>
                                <div class="card-header">
                                    Quick Transfer
                                </div>
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
                                        <p>Send Money within a Moment</p>
                                        <div class="chutad-yadav">
                                            <button type="button" class="btn-desi-nigga btn  " style={{ height: "95px" }}>Large button</button>
                                            <button type="button" class="btn-desi-nigga btn  " style={{ height: "95px" }}>Large button</button>
                                            <button type="button" class="btn-desi-nigga btn  " style={{ height: "95px" }}>Large button</button>
                                            <button type="button" class="btn-desi-nigga btn  " style={{ height: "95px" }}>Large button</button>
                                            <button type="button" class="btn-desi-nigga btn  " style={{ height: "95px" }}>Large button</button>
                                            <button type="button" class="btn-desi-nigga btn  " style={{ height: "95px" }}>Large button</button>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tau" style={{ width: "32%", float: "right", marginRight: "70px", height: "70% !Important", position: "absolute", top: "112px", right: "0" }}>
                        <div class="card shadow ">
                            <div class="card-body text-truncate" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <h2 class="card-title">Latest Transactions</h2>
                                <p>view all</p>
                            </div>
                            <div class="card-body" >
                                {latestTransactions.map(transaction => (
                                  <div key={transaction._id} className="transactions" style={{marginTop: "-15px",background: "rgba(255, 255, 255, 0.192)", backdropFilter:"blur(10px)", borderRadius:"15px", border: "1px solid rgba(221, 221, 221, 0.568)"
                                  }}>
                                    <p style={{marginBottom:"-6px", textAlign: "centre"}}>  __________________________________________________________ </p>
                                  <div style={{ marginTop: "4px", paddingLeft: "14px" }}>
                                      <div class="toppermaster" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                          <p style={{ marginBottom: "-2px", fontWeight: "bold" }}>Id: {transaction.transaction_id}</p>
                                          <div class="moneylane" style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                              <p style={{ color: transaction.type === 'deposit' ? 'green' : (transaction.type === 'withdraw' ? 'red' : 'inherit'), fontWeight: "bold" }}>
                                                  {transaction.type.toUpperCase()}
                                              </p>
                                              <p style={{ color: transaction.type === 'deposit' ? 'green' : (transaction.type === 'withdraw' ? 'red' : 'inherit'), marginTop: "-20px", fontWeight: "bold" }}>
                                                  {transaction.type === 'withdraw' ? '-' : '+'} INR {Math.abs(transaction.money)}
                                              </p>
                                          </div>
                                      </div>
                                      <p style={{ marginTop: "-40px", fontWeight: "bold" }}>{transaction.type === 'deposit' ? 'From' : 'To'}: {transaction.type === 'deposit' ? transaction.from : transaction.to}</p>
                                      <p style={{ textAlign: "right", marginRight: "14px", marginTop:"-18px" }}>{new Date(transaction.timestamp).toLocaleString()}</p>
                                  </div>
                              </div>
                              
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
