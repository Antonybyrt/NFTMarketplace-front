"use client";
import { CreateCollection } from '@/components/CreateCollection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import UploadImage from '@/components/upload/upload';

function Page() {
  return (
    <div>
      <div className="background-container">
        <div className="overlay"></div>
        <div className="content">
          <UploadImage/>
        </div>
      </div>
    </div>
  );
}

export default Page;