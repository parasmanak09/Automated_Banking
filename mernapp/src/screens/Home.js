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
            <div className="great" >
                <h1 style={{ paddingBottom: "25px" }}>Dashboard</h1>
                <div class="master101" style={{ width: "55%"}}>
                    <div class="row" style={{ paddingBottom: "20px" , display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                        <div className="card col-sm-6 mb-3 mb-sm-0" >
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
                        <div class="card text-center col-sm-6 " style={{ marginLeft: "3vw", width: '20rem' }}>
                            <div class="card-body">
                                <h6 class="card-title">Total Vaults</h6>
                                <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                                <h4 class="card-text">3 </h4>
                                <p style={{ paddingTop: "15px", marginBottom: "-5px" }}>Vault Balance</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">____________________</h6>
                                <h4 class="card-text" >INR 20,000 </h4>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style={{paddingTop:"20px"}}>
                    <div class="card " style={{width:"55.8%", marginLeft:"1px"}}>
                        <div class="card-header">
                            Quick Transfer
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>Send Money within a Moment</p>
                                
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
