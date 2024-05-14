import { useState, useMemo, useEffect } from "react";
function useDocumentVisibility() {
  const [isDocumentVisible, setIsDocumentVisible] = useState(!document.hidden);

  const handleVisibilityChange = () => {
    setIsDocumentVisible(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return useMemo(() => isDocumentVisible, [isDocumentVisible]);
}

export default useDocumentVisibility