import React from 'react'
import Navbar from '../components/Navbar'
import '../components/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/Background.js' // IMport JS Background File
import Background from '../components/Background.js'
export default function Home() {
    return (

        <div >

            <Navbar />
            <Background />
            <div className="great">
                <h1 style={{ paddingBottom: "25px" }}>Dashboard</h1>
                <div class="row">
                    <div className="card col-sm-6 mb-3 mb-sm-0" style={{ width: '20rem' }}>
                        <div class="card-body">
                            <h6 class="card-title">Total Balance</h6>
                            <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                            <h4 class="card-text">INR 200,000 </h4>
                            <div class="row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <div class="card" style={{ border: "none" }}>
                                        <div class="card-body">
                                            <p class="card-title">Income</p>
                                            <p>INR 50,000 </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="card" style={{ border: "none" }}>
                                        <div class="card-body">
                                            <p class="card-title" >Expense</p>
                                            <p>INR 10,000 </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card col-sm-6 " style={{marginLeft:"3vw", width: '20rem'}}>
                        <div class ="card-body">
                        <h6 class="card-title">Vault Balance</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                        <h4 class="card-text">INR 200,000 </h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}
