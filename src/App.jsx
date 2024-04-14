import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const calculateScore = (pwd) => {
    let pwdArray = pwd.split("");
    let pwdLen = pwdArray.length;
    let score = 0;
    let upperCnt = 0;
    let lowerCnt = 0;
    let numCnt = 0;
    let symCnt = 0;
    let lastUpper = 0;
    let lastLower = 0;
    let lastNum = 0;
    let lastSym = 0;
    let consecUpper = 0;
    let consecLower = 0;
    let consecNum = 0;
    let consecSym = 0;
    // let alpha = "abcdefghijklmnopqrstuvwxyz";
    // let nums = "01234567890";
    // let sym = ")!@#$%^&*()";
    for (let i = 0; i < pwdLen; i++) {
      if (pwdArray[i].match(/[a-z]/g)) {
        if (lastLower + 1 === i) {
          consecLower++;
        }
        lastLower = i;
        lowerCnt++;
      } else if (pwdArray[i].match(/[A-Z]/g)) {
        if (lastUpper + 1 == i) {
          consecUpper++;
        }
        lastUpper = i;
        upperCnt++;
      } else if (pwdArray[i].match(/[0-9]/g)) {
        if (lastNum + 1 === i) {
          consecNum++;
        }
        lastNum = i;
        numCnt++;
      } else if (pwdArray[i].match(/[^a-zA-Z0-9_]/g)) {
        if (lastSym + 1 === i) {
          consecSym++;
        }
        lastSym = i;
        symCnt++;
      }
      for (let j = 0; j < pwdLen; j++) {}
    }
    //score modification
    if (upperCnt > 0) {
      score += upperCnt * 2;
    }
    if (lowerCnt > 0) {
      score += lowerCnt * 2;
    }
    if (numCnt > 0) {
      score += numCnt * 2;
    }
    if (symCnt > 0) {
      score += symCnt * 2;
    }
    //score deduction
    if ((lowerCnt > 0 || upperCnt > 0) && symCnt === 0 && numCnt === 0) {
      score -= pwdLen;
    }
    if (lowerCnt === 0 && upperCnt === 0 && symCnt === 0 && numCnt > 0) {
      score -= pwdLen;
    }
    if (consecLower > 0) {
      score -= consecLower;
    }
    if (consecUpper > 0) {
      score -= consecUpper;
    }
    if (consecNum > 0) {
      score -= consecNum;
    }
    if (consecSym > 0) {
      score -= consecSym;
    }
    return score;
  };
  const calculateStrength = () => {
    let score = calculateScore(password);
    const length = password.length;
    if (score <= 10) {
      return "weak";
    } else if (score <= 20) {
      return "Moderate";
    } else if (score <= 30) {
      return "Strong";
    }
    return "Very Strong";
  };
  const calculateStrengthPercentage = () => {
    return calculateScore(password) / 0.4;
  };

  console.log(calculateStrength());

  return (
    <>
      <h1>Check Your Password's Strength</h1>
      <div className="card">
        <input
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <h2>{calculateStrength()}</h2>
        <div className="bar">
          <div
            className="StrengthBar"
            style={{ width: `${calculateStrengthPercentage()}%` }}
          ></div>
        </div>
        <div className="container"></div>
      </div>
      <p>
        The Password Strength is determined on your local System. The password
        is not transmitted over the network in any form.
      </p>
    </>
  );
}

export default App;
