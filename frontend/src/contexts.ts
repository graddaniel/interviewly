import { createContext } from 'react';

export const FeedbackMessageContext = createContext([{
    type: null,
    message: null,
}, () => {}] as any);
