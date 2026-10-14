import { useState } from 'react'
import './switchTabs.scss'

function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0)

    const activeTab = (value, index) => {
        setSelectedTab(index)
        onTabChange(value, index)
    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((value, index) => (
                    <button
                        key={value}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(value, index)}
                    >
                        {value}
                    </button>
                ))}
                {/* Moves by its own width, which matches the tab width at every breakpoint. */}
                <span className="movingBg" style={{ transform: `translateX(${selectedTab * 100}%)` }} />
            </div>
        </div>
    )
}

export default SwitchTabs;
