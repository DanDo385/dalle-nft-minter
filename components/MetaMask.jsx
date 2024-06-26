// components/MetaMask.jsx
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from './ui/Button';

const MetaMask = () => {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignIn = async () => {
        setError('');
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Connected with account:', accounts[0]);
                // Redirect to the image page after successful connection
                router.push('/images');
            } else {
                setError('MetaMask is not installed. Please install it to use this app.');
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            setError('Failed to connect to MetaMask. Please try again.');
        }
    };

    return (
        <div>
            <Button onClick={handleSignIn} className="flex items-center justify-center bg-orange-400 hover:bg-orange-600 text-slate-900 p-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                <Image src="/images/metamask.jpg" alt="MetaMask" width={40} height={40} unoptimized />
                <span className="ml-2">Sign In to MetaMask</span>
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default MetaMask;
