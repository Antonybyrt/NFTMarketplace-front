import React, { useState } from 'react';
import axios from 'axios';
import { APIService } from '@/service/api.service';

const UploadImage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (image) {
            try {
                const blobName = image.name;

                // Obtenir l'URL SAS de l'API route Next.js
                const response = await axios.get(`${APIService.baseURL}/cloud?blobName=${blobName}`);
                const { sasUrl } = response.data;

                // Télécharger l'image directement dans Azure Blob Storage
                await axios.put(sasUrl, image, {
                    headers: {
                        'x-ms-blob-type': 'BlockBlob',
                        'Content-Type': image.type
                    }
                });

                setUrl(sasUrl.split("?")[0]); // URL sans le token SAS
                console.log("File available at", sasUrl.split("?")[0]);
            } catch (error) {
                console.error("Error uploading image", error);
            }
        } else {
            console.error("No image selected");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            {url && <img src={url} alt="Uploaded" />}
        </div>
    );
};

export default UploadImage;
