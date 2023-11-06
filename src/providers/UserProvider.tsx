import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
}

const defaultUserContextValue = {
  username: '',
  setUsername: () => {},
  jobTitle: '',
  setJobTitle: () => {},
};

const UserContext = createContext<UserContextProps>(defaultUserContextValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedJobTitle = localStorage.getItem('jobTitle');

    if (savedUsername) {
      setUsername(savedUsername);
    }

    if (savedJobTitle) {
      setJobTitle(savedJobTitle);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('jobTitle', jobTitle);
  }, [username, jobTitle]);

  return (
    <UserContext.Provider
      value={{ username, setUsername, jobTitle, setJobTitle }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
