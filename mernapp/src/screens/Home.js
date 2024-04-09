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
            <div className="great" style={{ boxSizing: "border-box", position: "relative" }} >
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <h1 style={{ paddingBottom: "25px" }}>Dashboard</h1>
                
  
                <img style={{position:'relative', top:"0", right:"70px"}} src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" class="image--cover"/>
               </div>
                <div class="tau">
                    <div class="master101" style={{ width: "55%", height: "20%" }} >
                        <div class="row " style={{ paddingBottom: "20px", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <div className="card shadow  col-sm-6 mb-3 mb-sm-0" >
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
                            <div class="card shadow  text-center col-sm-6 " style={{ marginLeft: "3vw", width: '20rem' }}>
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
                    <div class="row" style={{ paddingTop: "20px" }}>
                        <div class="card shadow  " style={{ width: "55.8%", marginLeft: "1px" }}>
                            <div class="card-header">
                                Quick Transfer
                            </div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>Send Money within a Moment</p>
                                    <div class="chutad-yadav">
                                        <button type="button" class="btn-desi-nigga btn  " >Large button</button>
                                        <button type="button" class="btn-desi-nigga btn  " >Large button</button>
                                        <button type="button" class="btn-desi-nigga btn  " >Large button</button>
                                        <button type="button" class="btn-desi-nigga btn  " >Large button</button>
                                        <button type="button" class="btn-desi-nigga btn  " >Large button</button>
                                        <button type="button" class="btn-desi-nigga btn  " >Large button</button>
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

        </div>


    )
}
