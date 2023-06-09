import { FloatingPortal, arrow, offset, shift, useFloating, Placement } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, ReactNode, useRef, useState } from 'react';

interface PoppoverProps {
  reference: ReactNode;
  floating: ReactNode;
  className?: string;
  as?: ElementType;
  initialShow?: boolean;
  placement?: Placement;
  classNameArrow?: string;
  floatingEnabled?: boolean;
}

const Poppover = ({
  reference,
  floating,
  className,
  as: Element = 'div',
  initialShow,
  placement = 'bottom-end',
  classNameArrow = 'absolute -translate-y-full border-[11px] border-x-transparent border-b-white border-t-transparent',
  floatingEnabled = true
}: PoppoverProps) => {
  const [visible, setVisible] = useState(initialShow || false);

  const arrowRef = useRef<HTMLElement>(null);

  const { refs, x, y, strategy, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
    placement: placement
  });

  const showPoppover = () => {
    setVisible(true);
  };

  const hidePoppover = () => {
    setVisible(false);
  };

  return (
    <Element ref={refs.setReference} onMouseEnter={showPoppover} onMouseLeave={hidePoppover} className={className}>
      {reference}
      <FloatingPortal>
        <AnimatePresence>
          {visible && (
            <motion.div
              ref={refs.setFloating}
              style={{
                left: x ?? 0,
                top: y ?? 0,
                position: strategy,
                transformOrigin: `${middlewareData.arrow?.x}px ${placement.startsWith('bottom') ? 'top' : 'bottom'}`,
                zIndex: 9999
              }}
              className='relative max-w-full rounded-sm border border-gray-200 bg-white shadow-md before:absolute before:left-0 before:top-0 before:h-[10px] before:w-full before:-translate-y-full before:cursor-pointer before:bg-transparent'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span
                ref={arrowRef}
                className={classNameArrow}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              ></span>
              {floatingEnabled && floating}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default Poppover;
