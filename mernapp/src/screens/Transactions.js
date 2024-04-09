import React from 'react'
import Navbar from '../components/Navbar'
import '../components/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/Background.js' // IMport JS Background File
import Background from '../components/Background.js'
export default function Transactions() {
    return (<>
        <Navbar />
        <Background />


        <div class="tau" style={{ width: "80vw", height: "100vh", marginLeft: "200px" }}>
            <div class="card shadow ">
                <div class="card-body text-truncate" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <h2 class="card-title">Transactions</h2>

                </div>
                <div class="card-body" style={{ marginTop: "-25px", width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

                    <p>All</p>
                    <p>Expenses</p>
                    <p>Income</p>

                </div>
            </div>


        </div>


    </>




     
      

    );
}