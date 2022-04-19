import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const useTitle = (title) => {
    const { setHeader } = useOutletContext();
  
    useEffect(() => {
        setHeader(title);
    }, [setHeader, title]);
};

export default useTitle