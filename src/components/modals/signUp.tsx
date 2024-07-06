import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signMessage, getAccount } from '@wagmi/core';
import { config } from '../../app/providers';

const SignUpModal = () => {
    const { connector } = getAccount(config);

    async function handleSignMessage() {
        try {
          const result = await signMessage(config, {
            connector,
            message: 'esgi',
          });
          console.log('Message signed:', result);
        } catch (error) {
          console.error('Error signing message:', error);
        }
    }

  return (
    <div className="modal fade" id="signUpModal" tabIndex={-1} aria-labelledby="signUpModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light"> 
          <div className="modal-header">
            <h5 className="modal-title" id="signUpModalLabel">Sign Up</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">First name</label>
                <input type="email" className="form-control bg-dark text-light" id="firstName" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Last name</label>
                <input type="email" className="form-control bg-dark text-light" id="lastName" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control bg-dark text-light" id="email" aria-describedby="emailHelp" required />
              </div>
              <button onClick={handleSignMessage} className="btn btn-outline-light">Sign</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
