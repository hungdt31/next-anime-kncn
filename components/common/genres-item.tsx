import React from 'react'

interface SlideProps {
  item: string;
}

export const GenresItem: React.FC<SlideProps> = ({ item }) => {
  return (
    <span className='border-foreground border-2 rounded-lg px-3 py-1 font-semibold text-[12px]'>
      {item}
    </span>
  );
};