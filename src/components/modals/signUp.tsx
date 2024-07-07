import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signMessage, getAccount } from '@wagmi/core';
import { config } from '../../app/providers';
import { ISubscribe } from '@/models/subscribe.model';
import { Address } from 'viem';
import { AuthService } from '@/service/auth.service';
import { ServiceErrorCode } from '@/service/service.result';

const SignUpModal = () => {
    const { connector } = getAccount(config);

    const [sub, setSub] = useState<ISubscribe>({
        firstname: '',
        name: '',
        login: '',
        signature: ''
    });
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => {
            old.login = text;
            return old;
        });
    }

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => {
            old.login = text;
            return old;
        });
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => {
            old.login = text;
            return old;
        });
    }

    const handleSignatureChange = (address: Address) => {
        setSub((old) => {
            old.signature = address;
            return old;
        });
    }

    const handleSubscribe = async () => {
        const result = await AuthService.subscribe(sub);
        if(result.errorCode === ServiceErrorCode.success) {
            return;
        }
        if(result.errorCode === ServiceErrorCode.conflict) {
            setErrorMessage('Email already exists');
            return;
        }
        setErrorMessage('Internal server error');
    };

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
                <label htmlFor="text" className="form-label">First name</label>
                <input type="text" className="form-control bg-dark text-light" id="firstname" onChange={handleFirstNameChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">Last name</label>
                <input type="text" className="form-control bg-dark text-light" id="name" onChange={handleNameChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control bg-dark text-light" id="email" aria-describedby="emailHelp" onChange={handleEmailChange} required />
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
