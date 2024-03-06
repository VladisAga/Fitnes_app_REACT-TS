import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Link.module.scss';

type ILink = {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const LinkFC: React.FC<ILink> = ({ children, className, href, ...props }) => (
    <Link {...props} to={href} className={cn(styles.link, className)}  >
        {children}
    </Link>
);
