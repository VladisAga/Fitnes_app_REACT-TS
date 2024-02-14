import cn from 'classnames';
import styles from './Link.module.scss';
import React, { ReactNode } from 'react';

interface ILink {
    href: string;
    children: ReactNode;
    className?: string;
}

export const Link: React.FC<ILink> = ({children, className, href, ...props}) => {
    return (   
            <a {...props} href={href} className={cn(styles['link'], className )}  >
                {children}
            </a>
        
    )
}