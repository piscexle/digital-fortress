import { useEffect, useState, Dispatch, SetStateAction } from 'react';

const useCannotLeave = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [cannotLeave, setCannotLeave] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      if (!cannotLeave) {
        return;
      }
      e.returnValue = true;
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [cannotLeave]);

  return [cannotLeave, setCannotLeave];
};
export default useCannotLeave;
