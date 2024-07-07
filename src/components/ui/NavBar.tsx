"use client";
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signMessage, getAccount } from '@wagmi/core';
import { config } from '../../app/providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import logo from '../../../public/image/logo.png';
import './NavBar.css';
import SignInModal from '../modals/signIn';
import SignUpModal from '../modals/signUp';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavBar = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Image src={logo} alt="Logo" width={60} height={60} className="rounded-circle" />
            <span className="ms-2 title">SpiceDonut</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <ConnectButton showBalance={true} />
                </li>
                <li className="nav-item">
                    <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#signInModal">Sign In</button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#signUpModal">Sign Up</button>
                </li>
            </ul>
          </div>
        </div>
      </nav>
      <SignInModal />
      <SignUpModal />
    </>
  );
}

export default NavBar;
