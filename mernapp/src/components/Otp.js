import React, { useEffect, useState } from 'react';
import './otp.css'; // Replace with your CSS file path
import '@fortawesome/fontawesome-free/css/all.css';
import generateOTP from './Generateotp';

export default function Otp() {
  const [otp, setOtp] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const generatedOTP = generateOTP();
    setOtp(generatedOTP);
  }, []); 

  const isAllInputFilled = () => {
    const inputs = document.querySelectorAll(".otp-input");
    return Array.from(inputs).every((input) => input.value);
  };

  const toggleFilledClass = (field) => {
    field.classList.toggle("filled", field.value); 
  };

  const handleInput = (e) => {
    const target = e.target;
    toggleFilledClass(target);
    if (target.value !== '' && target.nextElementSibling) {
      target.nextElementSibling.focus();
    }
    setCurrentIndex(Array.from(document.querySelectorAll(".otp-input")).indexOf(target));
    verifyOTP();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".otp-input");
    const text = e.clipboardData.getData("text");
    inputs.forEach((item, index) => {
      if (index >= currentIndex && text[index - currentIndex]) {
        item.focus();
        item.value = text[index - currentIndex];
        toggleFilledClass(item);
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      e.preventDefault();
      const inputs = document.querySelectorAll(".otp-input");
      inputs.forEach((input) => {
        input.value = "";
        toggleFilledClass(input);
        if (input.previousElementSibling) {
          input.previousElementSibling.focus();
        }
      });
    } else {
      const inputs = document.querySelectorAll(".otp-input");
      inputs.forEach((input) => {
        if (input.value && input.nextElementSibling) {
          input.nextElementSibling.focus();
        }
      });
    }
  };

  const verifyOTP = () => {
    if (isAllInputFilled()) {
      const enteredOTP = Array.from(document.querySelectorAll(".otp-input")).map((input) => input.value).join('');
      if (enteredOTP === otp) {
        // Show alert and wait for user confirmation
        const confirmed = window.confirm('OTP verified successfully! Click OK to continue.');
        if (confirmed) {
          // Navigate to desired page
          console.log('Navigate to desired page');
        }
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    }
  };

  return (
    <section>
      <div className="container">
        <h1 className="title">Enter OTP</h1>
        <h2>Your OTP is {otp}</h2> {/* Display the generated OTP */}
        <form id="otp-form">
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
        </form>
        <button id="verify-btn" onClick={verifyOTP}>Verify OTP</button>
      </div>
    </section>
  );
}
