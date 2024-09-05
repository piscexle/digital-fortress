// Update the import path as needed
import { useAppSelector } from '@/store';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const { token } = useAppSelector((state) => state.authSlice);
  const [tokenState, setTokenState] = useState<string>('');

  useEffect(() => {
    setTokenState(token.accessToken);
  }, [token]);

  return { tokenState };
};

export default useAuth;
