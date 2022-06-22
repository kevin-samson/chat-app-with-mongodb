import React, { useContext, useState } from "react";

const ConvoContext = React.createContext(null);

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState();

  return (
    <ConvoContext.Provider value={{ conversations, setConversations }}>
      {children}
    </ConvoContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConvoContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }

  return context;
};
