"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import logo from '../../../public/image/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './NavBar.css';
import SignInModal from '../modals/signIn';
import SignUpModal from '../modals/signUp';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useRouter} from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Image src={logo} alt="Logo" width={60} height={60} className="rounded-circle" />
            <span className="ms-2 title" onClick={() => router.push('/')}>SpiceDonut</span>
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
                <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={() => router.push('/myAccount')}><i className="fas fa-user me-2"></i>My Account</button>
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
