import { createContext, useContext, useState } from "react";
import { SESSION_INICIAL } from "../constants/session";

const SessionContext = createContext();

export function SessionProvider({ children }) {

  const [session, setSession] = useState(SESSION_INICIAL);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}