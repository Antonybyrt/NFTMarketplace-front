"use client";
import { CreateCollection } from '@/components/CreateCollection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import GenerateImageButton from '@/components/generateNFT/GenerateImageButton';

function Page() {
  return (
    <div>
      <div className="background-container">
        <div className="overlay"></div>
        <div className="content">
          <GenerateImageButton/>
        </div>
      </div>
    </div>
  );
}

export default Page;