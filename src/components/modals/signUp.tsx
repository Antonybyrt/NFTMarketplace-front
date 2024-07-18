import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signMessage, getAccount } from '@wagmi/core';
import { config } from '../../app/providers';
import { ISubscribe } from '@/models/subscribe.model';
import { Address } from 'viem';
import { AuthService } from '@/service/auth.service';
import { ServiceErrorCode } from '@/service/service.result';
import * as bootstrap from 'bootstrap';
import { ErrorService } from '@/service/error.service';

const SignUpModal = () => {
    const { connector } = getAccount(config);

    const [sub, setSub] = useState<ISubscribe>({
        firstname: '',
        name: '',
        login: '',
        signature: ''
    });

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => ({
            ...old,
            login: text,
        }));
    }

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => ({
            ...old,
            firstname: text,
        }));
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => ({
            ...old,
            name: text,
        }));
    }

    const handleSignatureChange = (signature: string) => {
        setSub((old) => ({
            ...old,
            signature,
        }));
    }

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
      console.log(sub)
      const result = await AuthService.subscribe(sub);
      if (result.errorCode === ServiceErrorCode.success) {
          
          const modal = document.getElementById('signUpModal');
          if (modal) {
              const modalInstance = bootstrap.Modal.getInstance(modal);
              modalInstance?.dispose();
              ErrorService.successMessage('Authentification', 'Created successfully');
          }
      } else {
          if (result.errorCode === ServiceErrorCode.conflict) {
              ErrorService.errorMessage('Authentification','Email or wallet already exists');
          } else {
              ErrorService.errorMessage('Authentification','Email or wallet already exists');
          }
      }
    };

    async function handleSignMessage(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
        try {
          const result = await signMessage(config, {
            connector,
            message: 'esgi',
          });
          handleSignatureChange(result);
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
            <form onSubmit={handleSubscribe}>
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
              <button type="button" onClick={handleSignMessage} className="btn btn-outline-light">Sign message</button>
              <button type="submit" className="btn btn-outline-light">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
