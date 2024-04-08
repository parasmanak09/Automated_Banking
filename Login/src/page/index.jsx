import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='rectangle' />
      <div className='root'>
        <div className='rectangle-1'>
          <div className='rectangle-2'>
            <div className='image' />
          </div>
          <div className='flex-column-b'>
            <span className='log-in'>Log in</span>
            <span className='account-number'>Account number</span>
            <div className='text'>
              <div className='rectangle-3'>
                <span className='number'>1100 0000 0000 0000</span>
              </div>
            </div>
            <div className='groups'>
              <span className='password'>Password</span>
              <div className='text-4'>
                <div className='rectangle-5'>
                  <span className='text-6' />
                </div>
              </div>
              <div className='button'>
                <button className='rectangle-button'>
                  <span className='log-in-7'>Log in</span>
                </button>
              </div>
              <span className='forgot-password'>Forgot your password?</span>
            </div>
          </div>
        </div>
        <div className='image-8'>
          <div className='rectangle-9' />
          <div className='groups-a'>
            <span className='personal-finance'>
              Plutus is personal
              <br />
              finance, made simple.
            </span>
            <span className='all-in-one'>
              All your accounts, cards, savings,
              <br />
              and investments in one
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
