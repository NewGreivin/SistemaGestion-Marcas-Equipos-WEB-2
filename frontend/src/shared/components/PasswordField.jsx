//Autor: Greivin Eliecer A.G

import { useState } from 'react';
import Texto from './Texto';
import Icon from './icon';
import Button from './Button';

export default function PasswordField({
  id,
  label = 'Contraseña',
  name,
  value,
  onChange,
  placeholder = '',
  disabled,
  required,
  autoComplete = 'current-password',
  className = '',
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label d-flex align-items-center gap-1 mb-1">
          <Texto
            texto={label}
            alineado="left"
            color_text="black"
            tamano_letra="6"
          />
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="input-group">
        <input
          type={visible ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className="form-control"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => setVisible((prev) => !prev)}
          disabled={disabled}
          tabIndex={-1}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <Icon name={visible ? 'ojoCerrado' : 'ojoAbierto'} />
        </Button>
      </div>
    </div>
  );
}