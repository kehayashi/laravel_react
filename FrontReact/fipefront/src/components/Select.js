import React, { useState } from 'react';
import Select from 'react-select';

const SelectComponent = ({ labelText, options, onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    if (onSelectionChange) {
      onSelectionChange(selectedOption);
    }
  };

  return (
    <div className='mb-2 p-2'>
      <label>{labelText}</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        isSearchable
        placeholder="Selecione uma opção"
      />
    </div>
  );
};

export default SelectComponent;
