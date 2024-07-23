"use client";
import { CreateCollection } from '@/components/CreateCollection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import NftCardList from '../components/list/NftCardList/NftCardList';
import GenerateImageButton from '@/components/generateNFT/GenerateImageButton';


function Page() {
  return (
    <div>
      <div className="background-container">
        <div className="overlay"></div>
        <div className="content">
        </div>
      </div>
      <div className="card-list-container">
        <NftCardList />
      </div>
    </div>

    
    
  );
}

export default Page;