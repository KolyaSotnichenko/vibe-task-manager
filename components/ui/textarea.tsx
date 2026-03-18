import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={`border rounded px-3 py-2 w-full ${props.className ?? ''}`}
      />
    );
  },
);
