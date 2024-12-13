import React, { ChangeEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signMessage, getAccount } from '@wagmi/core';
import { config } from '../../app/providers';
import { ILogin } from '@/models/login.model';
import { AuthService } from '@/service/auth.service';
import { ServiceErrorCode } from '@/service/service.result';
import * as bootstrap from 'bootstrap';
import { ErrorService } from '@/service/error.service';

const SignInModal = () => {
    const { connector } = getAccount(config);

    const [log, setLog] = useState<ILogin>({
        login: '',
        signature: ''
    });

    async function handleSignMessage(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
        try {
            const message = `esgi`;
            const result = await signMessage(config, {
                message,
                connector,
            });
            setLog((old) => ({
                ...old,
                signature: result
            }));
            console.log('Message signed:', result);
        } catch (error) {
            console.error('Error signing message:', error);
        }
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setLog((old) => ({
            ...old,
            login: text,
        }));
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const res = await AuthService.login(log);
      if (res.errorCode === ServiceErrorCode.success && res.result) {
          localStorage.setItem("token", res.result.token);

          const modal = document.getElementById('signInModal');
          if (modal) {
              const modalInstance = bootstrap.Modal.getInstance(modal);
              modalInstance?.dispose();
              ErrorService.successMessage('Authentification','Authenticated successfully');
          }
      } else {
          if (res.errorCode === ServiceErrorCode.notFound) {
              ErrorService.errorMessage('Authentification', 'Invalid credentials')
          } else {
              ErrorService.errorMessage('Authentification', 'Internal servor error')
          }
      }
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
                      <form onSubmit={handleLogin}>
                          <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email address</label>
                              <input type="email" className="form-control bg-dark text-light" id="email" aria-describedby="emailHelp" onChange={handleEmailChange} required />
                          </div>
                          <button type="button" onClick={handleSignMessage} className="btn btn-outline-light">Sign Message</button>
                          <button type="submit" className="btn btn-outline-light">Sign in</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default SignInModal;