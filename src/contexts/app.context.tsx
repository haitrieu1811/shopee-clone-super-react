import { ReactNode, createContext, useState } from 'react';
import { ExtendedCartItem } from 'src/types/purchase.type';
import { User } from 'src/types/user.type';
import { getAccessTokenFromStorage, getProfileFromStorage } from 'src/utils/auth';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedCartList: ExtendedCartItem[];
  setExtendedCartList: React.Dispatch<React.SetStateAction<ExtendedCartItem[]>>;
  reset: () => void;
}

export const getInitialAppContext = () => ({
  isAuthenticated: Boolean(getAccessTokenFromStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromStorage(),
  setProfile: () => null,
  extendedCartList: [],
  setExtendedCartList: () => null,
  reset: () => null
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);
  const [extendedCartList, setExtendedCartList] = useState<ExtendedCartItem[]>([]);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setExtendedCartList([]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedCartList,
        setExtendedCartList,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
