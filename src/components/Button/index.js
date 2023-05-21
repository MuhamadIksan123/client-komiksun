import React from 'react';
import { Button } from 'react-bootstrap';

function KButton({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
  className,
}) {
  return (
    <>
      <Button
        className={className}
        onClick={action}
        variant={variant}
        size={size}
        disabled={disabled}
      >
        {loading ? 'Loading..' : children}
      </Button>
    </>
  );
}

export default KButton;
