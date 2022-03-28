import React, { useState } from "react";
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

  const [values, setValues] = useState({
    deposit: "",
    withdraw: "",
  });

  const [totalYield, setTotalYield] = useState();

  const [walletBalance, setWalletBalance] = useState(2000);

  const { deposit, withdraw } = values;

  useEffect(() => {
    getTotalYield()
      .then((res) => {
        setTotalYield(res);
      })
      .catch((err) => {});
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmitStake = (event) => {
    event.preventDefault();
    setValues({ ...values });
    stake({ deposit })
      .then(() => {})
      .catch(() => {
        console.log("Can't deposit");
      });
  };

  const onSubmitUnstake = (event) => {
    event.preventDefault();
    setValues({ ...values });
    unstake({ withdraw })
      .then(() => {})
      .catch(() => {
        console.log("Can't withdraw");
      });
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
              <p>Wallet:{walletBalance}</p>
              <div className="data">
                <p>ETH</p>
                <Button variant="text">Max</Button>
              </div>
              <div className="form-group">
                <input
                  className="form-control my-3 py-2"
                  onChange={handleChange("deposit")}
                  type="number"
                  placeholder="Amount"
                  value={deposit}
                />
              </div>
              <Button variant="contained" onClick={onSubmitStake}>
                Deposit
              </Button>
            </div>
            <div className="withdraw wrapper">
              <p>Withdraw</p>
              <hr />
              <p>Balance:{totalYield}</p>
              <div className="data">
                <p>ETH</p>
                <Button variant="text">Max</Button>
              </div>
              <div className="form-group">
                <input
                  className="form-control my-3 py-2"
                  onChange={handleChange("withdraw")}
                  type="number"
                  placeholder="Amount"
                  value={withdraw}
                />
              </div>
              <Button variant="contained" onClick={onSubmitUnstake}>
                Withdraw
              </Button>
            </div>
            <div className="total wrapper">
              <p>Total Deposit</p>
              <hr />
              <p>Balance:{totalYield}</p>
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
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      dygnifyStakingAddress,
      dygnifyStaking.abi,
      signer
    );
    const transaction = await contract.stake(amount);
    await transaction.wait();
    fetchGreeting();
  }
}

async function unstake(amount) {
  // TODO: first validate the amount
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const contract = new ethers.Contract(
      dygnifyStakingAddress,
      dygnifyStaking.abi,
      provider
    );
    const transaction = await contract.unstake(amount);
    await transaction.wait();
  }
}

async function getTotalYield() {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const contract = new ethers.Contract(
      dygnifyStakingAddress,
      dygnifyStaking.abi,
      provider
    );
    try {
      const data = await contract.getTotalYield();
      console.log("data: ", data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  //adding return for random data "By Sudhanshu"
  //Need to be deleted before set in production
  return 5000;
}

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export default withRouter(Home);
