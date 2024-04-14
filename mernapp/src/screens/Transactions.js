import React from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background.js';
import '../components/search.css';

export default function Transactions() {
    
    

    return (

        <>
            <Navbar />
            <Background />

            <div className="tau" style={{ width: "80vw", height: "100vh", marginLeft: "200px", paddingTop: "50px" }}>
                <div className="card shadow ">
                    <div className="card-body text-truncate" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <h2 className="card-title">Transactions</h2>

                        <div class="row height d-flex justify-content-center align-items-center">

                            <div class="col-md-8">

                                <div class="search">
                                    {/* <i class="fa fa-search"></i> */}
                                    <input type="text" class="form-control" placeholder="Search Transactions here...." />
                                    <button class="btn btn-primary">Search</button>
                                </div>



                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ marginTop: "-25px", width: "30%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <p>All</p>
                        <p>Expenses</p>
                        <p>Income</p>
                    </div>
                </div>
            </div>
        </>
    );
}
