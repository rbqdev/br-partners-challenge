import React from "react";
import { IMaskInput } from "react-imask";

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

export const TextMaskCustomInput = React.forwardRef<
  HTMLInputElement,
  CustomProps
>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 90000-0000"
      inputRef={ref}
      // eslint-disable-next-line
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});
