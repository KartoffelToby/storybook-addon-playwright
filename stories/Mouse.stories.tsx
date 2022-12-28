import React, { useState, useCallback } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Draggable from 'react-draggable';

export default {
  title: 'Mouse',
};

export const WithTippy = ({disabled, label}) => {
  return (
    <Tippy content="Tippy.js" placement="bottom-start">
      <button disabled={disabled}>
        {label}
      </button>
    </Tippy>
  );
};
WithTippy.args = {
  disabled: false,
  label: 'Hello Storybook',
}

export const WithInput = () => {
  const [val, setVal] = useState('Hi');
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }, []);

  return <input type="text" onChange={handleChange} value={val} />;
};

const StoryDraggable: React.FC = () => {
  return (
    <Draggable>
      <div style={{ background: 'red', height: 100, width: 100 }}></div>
    </Draggable>
  );
};

export const WithDraggable = () => {
  return <StoryDraggable />;
};
