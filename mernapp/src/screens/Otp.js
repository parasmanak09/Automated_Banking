import React, { useEffect, useState } from 'react';
import '../components/otp.css'; // Replace with your CSS file path
import '@fortawesome/fontawesome-free/css/all.css';
import generateOTP from '../components/Generateotp';
import { useNavigate } from 'react-router-dom';
import './smtp.js';

export default function Otp(props) {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const userId = props.userId;
  global.ID = userId;
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
    verifyOTP();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".otp-input");
    const text = e.clipboardData.getData("text");
    inputs.forEach((item, index) => {
      if (index < text.length) {
        item.value = text[index];
        toggleFilledClass(item);
      }
    });
    verifyOTP();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      e.preventDefault();
      const inputs = document.querySelectorAll(".otp-input");
      inputs.forEach((input, index) => {
        if (input.value === "" && index > 0) {
          input.previousElementSibling.focus();
        }
      });
    }
  };

  const verifyOTP = async () => {
    if (isAllInputFilled()) {
      const enteredOTP = Array.from(document.querySelectorAll(".otp-input")).map(input => input.value).join('');
      if (enteredOTP === otp) {
        alert('OTP verification successful');
        // Send POST request to update email_verified to true
        try {
          const response = await fetch(`http://localhost:9015/api/updateEmailVerified/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
           
          });

          if (response.ok) {
            console.log('Email verification status updated successfully');
          } else {
            console.error('Failed to update email verification status');
          }
        } catch (error) {
          console.error('Error occurred while updating email verification status:', error);
        }
        // Navigate to home page
        navigate('/Home');
      } else {
        console.error('Incorrect OTP');
        // Handle incorrect OTP (display error message, etc.)
      }
    }
  };

  return (
    <section>
      <div className="container11">
        <h1 className="title">Enter OTP</h1>
        <h2>Your OTP is {otp}</h2> {/* Display the generated OTP */}
        <form id="otp-form">
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
          <input type="text" className="otp-input" maxLength="1" onInput={handleInput} onPaste={handlePaste} onKeyDown={handleKeyDown} />
        </form>
      </div>
    </section>
  );
}
