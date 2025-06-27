"use client";
import Spinner from "@/components/Spinner";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  if (!store || !persistor) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner centered />}>
        {children}
      </PersistGate>
    </Provider>
  );
}
