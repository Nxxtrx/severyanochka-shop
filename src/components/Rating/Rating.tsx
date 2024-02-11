import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({ defaultValue }: { defaultValue: number }) {
  const [value, setValue] = React.useState<number | null>(defaultValue);
  const [readOnly, setReadOnly] = React.useState<boolean>(false);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setValue(newValue);
    if (newValue !== null) {
      setReadOnly(true); 
    }
  };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
        readOnly={readOnly}
      />
    </Box>
  );
}