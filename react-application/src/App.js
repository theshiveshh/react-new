import React, { useState } from 'react';
import './App.css'; 
import './Tooltip.css'; 


const Tooltip = ({ position, text, image, imageStyle, style, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const tooltipStyle = {
    display: showTooltip ? 'block' : 'none',
    ...style,
  };

  const tooltipArrowStyle = {
    display: showTooltip ? 'block' : 'none',
  };
  

  return (
    
    <div
      className={`tooltip-container ${position}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={`tooltip ${position}`} style={tooltipStyle}>
        <div className={`tooltip-arrow ${position}`} style={tooltipArrowStyle} />
        {image && <img src={image} alt="" style={{...style, ...imageStyle, display: 'block'}} />}
        {text}
      </div>
    </div>
  );
};

const App = () => {
  const [tooltips, setTooltips] = useState([
    { position: 'top', text: 'Tooltip 1', image: '', imageStyle: {}, style: {} },
    { position: 'right', text: 'Tooltip 2', image: '', imageStyle: {}, style: {} },
    { position: 'bottom', text: 'Tooltip 3', image: '', imageStyle: {}, style: {} },
  ]);

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [tooltipOptions, setTooltipOptions] = useState({
    position: 'top',
    text: '',
    image: '',
    imageStyle: {},
    style: {},
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleTooltipChange = (key, value) => {
    setTooltipOptions(prevOptions => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  const handleTargetButtonChange = (index) => {
    setSelectedButtonIndex(index);
    setTooltipOptions({
      position: tooltips[index].position,
      text: tooltips[index].text,
      image: tooltips[index].image,
      imageStyle: tooltips[index].imageStyle,
      style: tooltips[index].style,
    });
  };

  const handleApplyTooltipChanges = () => {
    if (selectedButtonIndex !== null) {
      const updatedTooltips = [...tooltips];
      updatedTooltips[selectedButtonIndex] = tooltipOptions;
      setTooltips(updatedTooltips);
      setShowNotification(true); 
      setTimeout(() => setShowNotification(false), 2000);
    }
  };
  <h1 className="page-heading">Tooltip Customization</h1>
  return (
    
    <div className="App">
  
      <div className="tooltip-controls">
  <div className="tooltip-form">
    <label htmlFor="selectButton"> Target Button :</label>
    <select
      id="selectButton"
      name="selectButton"
      onChange={event => handleTargetButtonChange(Number(event.target.value))}
      value={selectedButtonIndex !== null ? selectedButtonIndex : ''}
    >
      <option value="" disabled>Select a button</option>
      {tooltips.map((tooltip, index) => (
        <option key={index} value={index}>Button {index + 1}</option>
      ))}
    </select>
    <p>Selected Button: {selectedButtonIndex !== null ? `Button ${selectedButtonIndex + 1}` : 'None'}</p>
    {selectedButtonIndex !== null && (
      <>
        <div className="tooltip-options">
          <div className="tooltip-group">
            <label htmlFor="position">Tooltip Position:</label>
            <select
              id="position"
              name="position"
              onChange={event => handleTooltipChange('position', event.target.value)}
              value={tooltipOptions.position}
            >
              <option value="top">Top</option>
              <option value="right">Right</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
            </select>
          </div>
          <div className="tooltip-group">
            <label htmlFor="text">Tooltip Text:</label>
            <input
              type="text"
              id="text"
              name="text"
              onChange={event => handleTooltipChange('text', event.target.value)}
              value={tooltipOptions.text}
            />
          </div>
          <div className="tooltip-group">
            <label htmlFor="color">Font Color:</label>
            <input
              type="text"
              id="color"
              name="color"
              placeholder="e.g. red"
              onChange={event => handleTooltipChange('style', { ...tooltipOptions.style, color: event.target.value })}
              value={tooltipOptions.style.color || ''}
            />
          </div>
          <div className="tooltip-group">
            <label htmlFor="fontSize">Font Size:</label>
            <input
              type="text"
              id="fontSize"
              name="fontSize"
              placeholder="e.g. 16px"
              onChange={event => handleTooltipChange('style', { ...tooltipOptions.style, fontSize: event.target.value })}
              value={tooltipOptions.style.fontSize || ''}
              
            />
          </div>
          <div className="tooltip-group">
            <label htmlFor="cornerRadius">Corner Radius:</label>
            <input
              type="text"
              id="cornerRadius"
              name="cornerRadius"
              placeholder="e.g. 5px"
              onChange={event =>
                handleTooltipChange('style', { ...tooltipOptions.style, borderRadius: event.target.value })
              }
              value={tooltipOptions.style.borderRadius || ''}
              />
              </div>
              <div className="tooltip-group">
                <label htmlFor="backgroundColor">Background Color:</label>
                <input
                  type="text"
                  id="backgroundColor"
                  name="backgroundColor"
                  placeholder="e.g. red,green"
                  onChange={event =>
                    handleTooltipChange('style', { ...tooltipOptions.style, backgroundColor: event.target.value })
                  }
                  value={tooltipOptions.style.backgroundColor || ''}
                />
              </div>
              <div className="tooltip-group">
            <label htmlFor="padding">Padding:</label>
            <input
              type="text"
              id="padding"
              name="padding"
              placeholder="e.g. 10px"
              onChange={event =>
                handleTooltipChange('style', { ...tooltipOptions.style, padding: event.target.value })
              }
              value={tooltipOptions.style.padding || ''}
            />
          </div>

          
          <div className="tooltip-group">
            <label htmlFor="image">Tooltip Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={(event) =>
                handleTooltipChange('image', event.target.value)
              }
              value={tooltipOptions.image || ''}
            />
          </div>
        </div>
        <button
          onClick={() => {
            handleApplyTooltipChanges();
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
          }}
        >
          Apply Changes
        </button>
        {showNotification && <span className="notification">Changes saved!</span>}
      </>
    )}
  </div>
</div>

      <div className="tooltip-preview">
        <div className="tooltip-buttons">
          {tooltips.map((tooltip, index) => (
            <Tooltip key={index} {...tooltip}>
              <button
                className={`target-button`}
                style={{ order: index + 1 }}
                onClick={() => handleTargetButtonChange(index)}
              >
                Button {index + 1}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;