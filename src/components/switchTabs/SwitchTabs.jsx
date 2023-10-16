import React, { useState } from 'react'
import './switchTabs.scss'



function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTab = (value, index) => {
        setLeft(index * 90)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(value, index)
    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((value, index) => {
                    return <span key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(value, index)}>{value}</span>
                })}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    )
}

export default SwitchTabs;
