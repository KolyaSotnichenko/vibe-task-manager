import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={`border rounded px-3 py-2 w-full ${props.className ?? ''}`}
      />
    );
  },
);
