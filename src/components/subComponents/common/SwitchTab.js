import React, { useState } from "react";

import "../../../css/switchTab.css";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setleft] = useState(0);

  const activeTab = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((item, i) => (
          <span
            key={i}
            className={`tabItem ${selectedTab === i && "active"}`}
            onClick={() => {
              activeTab(item, i);
            }}
          >
            {item}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTab;
