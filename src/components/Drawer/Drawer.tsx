import { Fragment, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
  children: ReactNode;
  visible: boolean;
  onClickMask: () => void;
}

const Drawer = ({ children, visible, onClickMask }: DrawerProps) => {
  return createPortal(
    <Fragment>
      {visible && (
        <div className='fixed inset-0 z-[999]'>
          <div
            className='absolute inset-0 bg-black/80'
            onClick={onClickMask}
            tabIndex={0}
            role='button'
            aria-hidden='true'
          ></div>
          <div className='relative z-10 max-h-full min-h-full max-w-[80%] overflow-auto bg-white p-4'>{children}</div>
        </div>
      )}
    </Fragment>,
    document.body
  );
};

export default Drawer;
