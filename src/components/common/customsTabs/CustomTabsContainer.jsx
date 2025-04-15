// components/CustomTabs.js
import React, { useState } from "react";
import { CustomTabs } from "./CustomTabs";

export const CustomTabsContainer = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const customTabsProps = {
    tabs,
    handleTabChange,
    value,
  };

  return <CustomTabs {...customTabsProps} />;
};
