import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import "./home.css";
import { ethers } from "hardhat";
import dygnifyStaking from "../artifacts/contracts/DygnifyStaking.sol/DygnifyStaking.json";

const dygnifyStakingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Home = ({ history }) => {
  const activeTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#000000" };
    }
  };

  return (
    <>
      <section className="box">
        <aside className="left">
          <h1>
            <Link to="/">DYGNIFY</Link>
          </h1>
          <Link style={activeTab(history, "/")} to="/">
            Pool
          </Link>
          <Link style={activeTab(history, "/borrow")} to="/borrow">
            Borrow
          </Link>
        </aside>
        <aside className="right">
          <section className="hero">
            <Button variant="outlined">Home</Button>
            <Button
              variant="outlined"
              onClick={() => {
                console.log("Wallet Connected");
              }}
            >
              Connect Wallet
            </Button>
          </section>
          <section className="txn">
            <div className="deposit wrapper">
              <p>Deposit</p>
              <hr />
              <p>Wallet:</p>
              <div className="data">
                <p>ETH</p>
                <Button variant="text">Max</Button>
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Deposited");
                }}
              >
                Deposit
              </Button>
            </div>
            <div className="withdraw wrapper">
              <p>Withdraw</p>
              <hr />
              <p>Balance:</p>
              <div className="data">
                <p>ETH</p>
                <Button variant="text">Max</Button>
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Withdrawn");
                }}
              >
                Withdraw
              </Button>
            </div>
            <div className="total wrapper">
              <p>Total Deposit</p>
              <hr />
              <p>Balance:</p>
            </div>
          </section>
          <section className="bottom">
            <h2>Transaction History</h2>
            <div className="details">
              <div className="date">
                <h3>Date</h3>
                <hr />
              </div>
              <div className="change">
                <h3>Change</h3>
                <hr />
              </div>
              <div className="hash">
                <h3>Txn Hash</h3>
                <hr />
              </div>
            </div>
          </section>
        </aside>
      </section>
    </>
  );
};

async function stake(amount) {
  // TODO: first validate the amount
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(dygnifyStakingAddress, dygnifyStaking.abi, signer)
    const transaction = await contract.stake(amount)
    await transaction.wait()
    fetchGreeting()
  }
}

async function unstake(amount) {
  // TODO: first validate the amount
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const contract = new ethers.Contract(dygnifyStakingAddress, dygnifyStaking.abi, provider);
    const transaction = await contract.unstake(amount);
    await transaction.wait();
  }
}

async function getTotalYield() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const contract = new ethers.Contract(dygnifyStakingAddress, dygnifyStaking.abi, provider);
    try {
      const data = await contract.getTotalYield();
      console.log('data: ', data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

export default withRouter(Home);
