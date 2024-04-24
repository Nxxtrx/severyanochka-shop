import { Slider } from '@mui/material';
import React from 'react';
import type { FC } from 'react';
import './Filter.scss';

interface FilterProps {
  setFilteredCount: React.Dispatch<React.SetStateAction<number[]>>;
}

const Filter: FC<FilterProps> = ({ setFilteredCount }) => {
  const [value, setValue] = React.useState<number[]>([100, 10000]);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newValue = [...value]; // Создаем копию массива value

    if (event.target.id === 'filter-input-min') {
      newValue[0] = Number(event.target.value); // Обновляем только первый элемент массива
    } else if (event.target.id === 'filter-input-max') {
      newValue[1] = Number(event.target.value); // Обновляем только второй элемент массива
    }
    setValue(newValue);
  };

  const handleResetFilter = (): void => {
    setFilteredCount([]);
  };

  return (
    <div className="filter">
      <div className="filter__title-container">
        <p className="filter__title">Фильтр</p>
      </div>
      <div className="filter__price-container">
        <span>Цена</span>
        <button className="filter__reset" type="button" onClick={handleResetFilter}>
          Очистить
        </button>
      </div>
      <div className="filter__input-container">
        <input
          className="filter__input"
          id="filter-input-min"
          value={value[0]}
          onChange={handleInputChange}
          type="number"
        />
        <hr />
        <input
          className="filter__input"
          value={value[1] ?? ''}
          id="filter-input-max"
          onChange={handleInputChange}
          type="number"
        />
      </div>
      <Slider
        className="filter__slider"
        disableSwap
        value={value}
        onChange={handleChange}
        max={10000}
        color="success"
      />
      <button
        className="filter__btn-submit"
        onClick={() => {
          setFilteredCount(value);
        }}>
        Применить
      </button>
    </div>
  );
};

export default Filter;
