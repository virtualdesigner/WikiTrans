import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  width: 100%;
`;

const DropdownButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  font-size: 0.8rem;
`;

const CheckboxList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  text-align: left;
`;

const CheckboxLabel = styled.label`
  display: block;
  padding: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

function DropdownWithCheckboxes({ options, selectedOptions, setSelectedOptions }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  }

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleDropdown} type="button">
        {selectedOptions.length === 0
          ? 'Assign annotators'
          : selectedOptions.join(', ')}
        <span>{isOpen ? '-' : '+'}</span>
      </DropdownButton>
      {isOpen && (
        <CheckboxList>
          {options.map((option) => (
            <CheckboxLabel key={option}>
              <CheckboxInput
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </CheckboxLabel>
          ))}
        </CheckboxList>
      )}
    </DropdownWrapper>
  );
}

export default DropdownWithCheckboxes;
