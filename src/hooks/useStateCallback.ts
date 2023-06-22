import { useState, useRef, useEffect, useCallback } from 'react';

type Callback<T> = (state: T) => void;
type Callbacks<T> = Callback<T>[];
type StateSetterWithCallback<T> = (
  stateSetterInput: (T | ((state: T) => T)),
  callback?: Callback<T>
) => void;

export function useStateCallback<T>(
  initialState: T
): [T, (
    stateSetterInput: (T | ((state: T) => T)),
    callback?: Callback<T>
  ) => void] {

  const [ state, setState ] = useState<T>(initialState);
  const callbacksReference = useRef<Callbacks<T>>([]); // init mutable ref container for callbacks

  const setStateCallback = useCallback((
    stateSetterInput: (T | ((state: T) => T)),
    callback?: Callback<T>) => {

    if(callback) {
      callbacksReference.current.push(callback);
    } 

    setState(stateSetterInput);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    for (const callback of callbacksReference.current) {
      callback(state);
    }

    callbacksReference.current = [];
  }, [state]);

  return [state, setStateCallback];
}