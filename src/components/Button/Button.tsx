import cn from 'classnames';
import styles from './Button.module.scss';
import React, { ReactNode } from 'react';

interface IButton {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}

export const Button: React.FC<IButton> = ({children, className, ...props}) => {
    return (   
            <button {...props} className={cn(styles['btn'], className )}  >
                {children}
            </button>
        
    )
}