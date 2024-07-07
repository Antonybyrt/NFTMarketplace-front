import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signMessage, getAccount } from '@wagmi/core';
import { config } from '../../app/providers';
import { ILogin } from '@/models/login.model';
import { AuthService } from '@/service/auth.service';
import { ServiceErrorCode } from '@/service/service.result';
import { Address } from 'viem';

const SignInModal = () => {
    const { connector } = getAccount(config);

    const [log, setLog] = useState<ILogin>({
        login: '',
        signature: ''
    });
    const [errorMessage, setErrorMessage] = useState<string>();

    async function handleSignMessage() {
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

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setLog((old) => {
            old.login = text;
            return old;
        });
    }

    const handleSignatureChange = (address: Address) => {
        setLog((old) => {
            old.signature = address;
            return old;
        });
    }

    const handleLogin = async () => {
        const res = await AuthService.login(log);
        if(res.errorCode === ServiceErrorCode.success && res.result) {
            localStorage.setItem("token", res.result.token);
            return;
        }
        if(res.errorCode === ServiceErrorCode.notFound) {
            setErrorMessage('Invalid credentials');
            return;
        }
        setErrorMessage('Internal server error');
    };

  return (
    <div className="modal fade" id="signInModal" tabIndex={-1} aria-labelledby="signInModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light"> 
          <div className="modal-header">
            <h5 className="modal-title" id="signInModalLabel">Sign In</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control bg-dark text-light" id="email" aria-describedby="emailHelp" onChange={handleEmailChange} required />
              </div>
              <button onClick={handleSignMessage} className="btn btn-outline-light">Sign Message</button>
              <button onClick={handleLogin} className="btn btn-outline-light">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
