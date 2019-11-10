import { useRef, useEffect } from 'react';

export const useKeyboardShortcut = (targetKey: string, handler: () => void) => {
  const savedHandler: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  function downHandler({ key }: any) {
    if (key === targetKey) {
      savedHandler.current(handler);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
};


Example...

useKeyboardShortcut("Escape", () => console.log("Escaped!"))
