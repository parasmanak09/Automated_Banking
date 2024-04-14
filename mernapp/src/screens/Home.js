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
                income += transaction.amount;
            } else if (transaction.type === "withdraw") {
                // If withdraw, add amount to totalExpense
                expense += transaction.amount;
            }
        });

        // Set totalIncome and totalExpense states
        setTotalIncome(income);
        setTotalExpense(expense);
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
        }
    }, [userData]);

    return (


        <div >

            <Navbar />
            <Background />{userData && (
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
                                <h2 class="card-title">Transactions</h2>
                                <p>view all</p>
                            </div>
                            <div class="card-body" style={{ marginTop: "-25px", width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

                                <p>All</p>
                                <p>Expenses</p>
                                <p>Income</p>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}
