import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='image'>
        <div className='groups'>
          <div className='image-1' />
        </div>
        <div className='groups-2'>
          <span className='personal-finance'>
            Plutus is personal
            <br />
            finance, made simple
          </span>
          <span className='all-in-one'>
            All your accounts, cards, savings
            <br />
            andinvestments in one place
          </span>
        </div>
      </div>
      <div className='image-3'>
        <div className='groups-4'>
          <div className='image-5' />
          <div className='groups-6'>
            <span className='verify-identity'>Verify your identity</span>
            <span className='sent-message'>
              We've just sent a text messaqe with your
              <br />
              security code on the number +91 .
            </span>
            <span className='enter-code'>
              Please enter the code in order to continue.
            </span>
            <div className='flex-row'>
              <div className='image-7'>
                <span className='span-0'>0</span>
              </div>
              <div className='image-8' />
              <div className='image-9' />
              <div className='image-a' />
            </div>
            <div className='button'>
              <button className='background'>
                <span className='verify'>Verify</span>
              </button>
            </div>
            <span className='not-received'>I haven't received the code.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
