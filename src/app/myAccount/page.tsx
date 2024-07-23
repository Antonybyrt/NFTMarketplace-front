"use client";
import { IUserId } from '@/models/user.model';
import { AuthService } from '@/service/auth.service';
import { ServiceErrorCode } from '@/service/service.result';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import { CreateCollection } from '@/components/CreateCollection';
import { ErrorService } from '@/service/error.service';

function MyAccountPage() {
    const router = useRouter();

    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<IUserId>();

    useEffect(() => {
        const fetchUser = async () => {
            if(!token) {
                setIsLoading(false);
                ErrorService.errorMessage('Account access', 'Please, login before trying to access');
                router.push('../');
                return;
            }
            const res = await AuthService.me(token);
            if(res.errorCode === ServiceErrorCode.success && res.result) {
                setUser(res.result);
            } else {
                router.push('../auth/logout');
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [token]);

    if (isLoading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Checking access...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-light">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>My Account</span>
                    <button className="btn btn-primary" onClick={() => router.push('/auth/logout')}>Log out</button>
                </div>
                <div className="card-body">
                    {user && (
                        <>
                            <h5 className="card-title">{user.firstname} {user.name}</h5>
                            <p className="card-text"><strong>Email:</strong> {user.mail}</p>
                        </>
                    )}
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-link text-light" onClick={() => router.push('/myAccount/MyCollections')}>
                            Mes collections
                        </button>
                        <button className="btn btn-link text-light" onClick={() => router.push('/myAccount/myNFTs')}>
                            Mes NFTs
                        </button>
                    </div>
                </div>
            </div>
            <CreateCollection user={user} />
        </div>
    );
}

export default MyAccountPage;