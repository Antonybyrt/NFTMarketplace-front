"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import NftCardList from '../components/list/NftCardList/NftCardList';

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