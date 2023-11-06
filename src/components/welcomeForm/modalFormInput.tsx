import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

export default function ModalFormInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange: ChangeEventHandler;
}) {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input placeholder={placeholder} onChange={onChange} value={value} />
      </FormControl>
    </>
  );
}
