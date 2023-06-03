import { ReactNode, createContext, useState } from 'react';
import { User } from 'src/types/user.type';
import { getAccessTokenFromStorage, getProfileFromStorage } from 'src/utils/auth';

interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialAppContext = {
    isAuthenticated: Boolean(getAccessTokenFromStorage()),
    setIsAuthenticated: () => null,
    profile: getProfileFromStorage(),
    setProfile: () => null
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile);

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
