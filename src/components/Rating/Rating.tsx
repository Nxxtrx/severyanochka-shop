import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface BasicRatingProps {
  defaultValue: number;
}

const BasicRating: React.FC<BasicRatingProps> = ({ defaultValue }) => {
  const [value, setValue] = React.useState<number | null>(defaultValue);
  const [readOnly, setReadOnly] = React.useState<boolean>(false);

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ): void => {
    setValue(newValue);
    if (newValue !== null) {
      setReadOnly(true);
    }
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
        readOnly={readOnly}
      />
    </Box>
  );
};

export default BasicRating;
