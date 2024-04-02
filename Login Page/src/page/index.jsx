import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='image'>
        <div className='groups'>
          <div className='groups-1'>
            <div className='image-2' />
          </div>
        </div>
        <div className='groups-3'>
          <span className='personal-finance'>
            Plutus is personal
            <br />
            finance, made simple.
          </span>
          <span className='all-accounts'>
            All your accounts, cards, savings,
            <br />
            and investments in one
          </span>
        </div>
      </div>
      <div className='image-4'>
        <div className='image-5' />
        <div className='flex-column-bc'>
          <span className='log-in'>Log in</span>
          <span className='account-number'>Account number</span>
          <div className='text'>
            <div className='background'>
              <span className='number'>1100 0000 0000 0000</span>
            </div>
          </div>
          <div className='groups-6'>
            <span className='password'>Password</span>
            <div className='text-7'>
              <div className='background-8'>
                <span className='text-9' />
              </div>
            </div>
            <button className='button'>
              <div className='background-a'>
                <span className='log-in-b'>Log in</span>
              </div>
            </button>
            <span className='forgot-password'>Forgot your password?</span>
          </div>
        </div>
      </div>
      <div className='frame' />
    </div>
  );
}
