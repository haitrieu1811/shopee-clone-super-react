import { Fragment } from 'react';

const Heading = ({ title, description }: { title: string; description: string }) => {
  return (
    <Fragment>
      <h1 className='text-lg font-medium capitalize'>{title}</h1>
      <p className='text-sm text-gray-500'>{description}</p>
    </Fragment>
  );
};

export default Heading;
