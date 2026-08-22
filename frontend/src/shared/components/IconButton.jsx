//Autor: Ricardo Chaves

import Button from "./Button";
import Icon from "./Icon";
import Texto from "./Texto"

export default function IconButton({ icon, onClick, type = "button", variant = "primary", loading = false, disabled = false, className = "", iconClassName = "", iconStyle = {}, label, ...props }) {
    return (
        <>
            <Button
                type={type}
                variant={variant}
                onClick={onClick}
                loading={loading}
                disabled={disabled}
                className={className}
                {...props}
            >
                <Icon name={icon} className={iconClassName} style={iconStyle}/>
                {label && (
                    <Texto
                        texto={label}
                        alineado="right"
                        color_text="white"
                        tamano_letra="6"
                    />
                )}
            </Button>
        </>
    )
}