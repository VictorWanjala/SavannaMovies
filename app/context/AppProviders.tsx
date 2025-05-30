"use client"

import React from "react";
import AuthProvider from "../providers/AuthProvider";
import UIProvider from "../providers/UIProvider";

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <UIProvider>
        <main>{children}</main>
      </UIProvider>
    </AuthProvider>
  );
};
export default AppProviders;