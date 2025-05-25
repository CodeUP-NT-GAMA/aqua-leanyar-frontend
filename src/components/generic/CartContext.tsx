import React, {createContext, useContext, useState} from 'react';

type BadgeContextType = {
    count: number;
    setCount: (count: number) => void;
};

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export const BadgeProvider = ({children}: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);

    return (
        <BadgeContext.Provider value={{count, setCount}}>
            {children}
        </BadgeContext.Provider>
    );
};

export const useBadge = () => {
    const context = useContext(BadgeContext);
    if (!context) {
        throw new Error('useBadge must be used within a BadgeProvider');
    }
    return context;
};