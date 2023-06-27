import { useState, useRef, useEffect, useCallback } from 'react';


export function useStateCallback<T>(
  initialState: T
): [T, (stateSetterParam: (T | ((state: T) => T)), cb?: (state: T) => void) => void] {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<((state: T) => void)[]>([]); // init mutable ref container for callbacks

  const setStateCallback = useCallback((
    stateSetterParam: (T | ((state: T) => T)),
    cb?: (state: T) => void) => {
    if(cb) {
      cbRef.current.push(cb);
    } 

    setState(stateSetterParam);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    for (const cb of cbRef.current) {
      cb(state);
    }

    cbRef.current = [];
  }, [state]);

  return [state, setStateCallback];
}