/*import React, { useState } from 'react';
import axios from 'axios';

const GenerateImageButton: React.FC = () => {
    const [nftName, setNftName] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateImage = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:6789/nft/generate-image', { name: nftName });
            setImageUrl(response.data.imageUrl);
            console.log('Image générée avec succès:', response.data.imageUrl);
        } catch (error) {
            console.error('Erreur lors de la génération de l\'image:', error);
            setError('Erreur lors de la génération de l\'image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="Nom de l'image"
            />
            <button onClick={handleGenerateImage} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div>
                    <p>Image URL:</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
                    <img src={imageUrl} alt="Generated NFT" style={{ maxWidth: '100%', marginTop: '10px' }} />
                </div>
            )}
        </div>
    );
};

export default GenerateImageButton;*/

import React, { useState } from 'react';
import axios from 'axios';

const GenerateImageButton: React.FC = () => {
    const [nftName, setNftName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateImage = async () => {
        if (!imageFile) {
            setError('Please upload an image');
            return;
        }

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('name', nftName);
        formData.append('image', imageFile);

        try {
            const response = await axios.post('http://localhost:6789/nft/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImageUrl(response.data.imageUrl);
            console.log('Image générée avec succès:', response.data.imageUrl);
        } catch (error) {
            console.error('Erreur lors de la génération de l\'image:', error);
            setError('Erreur lors de la génération de l\'image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="Nom de l'image"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
            <button onClick={handleGenerateImage} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div>
                    <p>Image URL:</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
                    <img src={imageUrl} alt="Generated NFT" style={{ maxWidth: '100%', marginTop: '10px' }} />
                </div>
            )}
        </div>
    );
};

export default GenerateImageButton;

