import { useEffect, useRef, useState } from 'react';

// Adapted from React Bits Magnet: https://reactbits.dev/animations/magnet
export default function Magnet({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 5,
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return undefined;
    }

    const handleMouseMove = (event) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } =
        magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - event.clientX);
      const distY = Math.abs(centerY - event.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        setPosition({
          x: (event.clientX - centerX) / magnetStrength,
          y: (event.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [disabled, magnetStrength, padding]);

  return (
    <span
      ref={magnetRef}
      className={wrapperClassName}
      style={{ display: 'inline-block', position: 'relative' }}
      {...props}
    >
      <span
        className={innerClassName}
        style={{
          display: 'inline-block',
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive
            ? 'transform 0.25s ease-out'
            : 'transform 0.55s ease-in-out',
          willChange: 'transform',
        }}
      >
        {children}
      </span>
    </span>
  );
}
