import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
  children: ReactNode;
  visible: boolean;
  onClickMask: () => void;
}

const Drawer = ({ children, visible, onClickMask }: DrawerProps) => {
  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div className='fixed inset-0 z-[999]'>
          <div
            className='absolute inset-0 bg-black/80'
            onClick={onClickMask}
            tabIndex={0}
            role='button'
            aria-hidden='true'
          />
          <motion.div
            initial={{ opacity: 0, translateX: '-100%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '-100%' }}
            transition={{ duration: 0.25 }}
            className='relative z-10 max-h-full min-h-full max-w-[80%] overflow-auto bg-white p-4'
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Drawer;
