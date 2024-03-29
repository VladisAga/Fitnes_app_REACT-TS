import type { BadgeProps } from 'antd';
import { Badge, Calendar, ConfigProvider } from 'antd';
import type { Moment } from 'moment';
import styles from './CalendarFC.module.scss';
import { calendarOnRu } from '../../configs/calendarOnRu';
import { createRoot } from 'react-dom/client';

import moment from 'moment';
import CreationCard from '@components/CreationCard/CreationCard';
import { useEffect, useRef, useState } from 'react';

moment.updateLocale('ru', calendarOnRu);
moment.locale('ru');

const containerDiv = document.createElement('div');
const root = createRoot(containerDiv);

const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Moment) => {
    if (value.date() === 1) {
        return value.format('MMM');
    }
    return null;
};

const CalendarFC = () => {
    const [date, setDate] = useState('');
    const [cardExist, setCardExist] = useState(0);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (calendarRef.current) {
            const parentBlock = calendarRef.current.querySelector('tbody');
            const parentWidth = parentBlock && parentBlock.offsetWidth;
            const parentLeft = parentBlock?.getBoundingClientRect().left;
            console.log( parentLeft)
            const childBlock = calendarRef.current.querySelector('#card') as HTMLElement;
            if (childBlock) {
                const childRect = childBlock.getBoundingClientRect();
                const childLeft = childRect.left;
                const childRight = childRect.right;
                const childWidth = childRect.width;
                (childLeft - parentLeft! + childWidth > parentWidth! )
                    ? (childBlock.style.right = '0', childBlock.style.left = '')
                    : (childBlock.style.left = '0', childBlock.style.right = '')
            }
        }
    }, [date])

    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <ul className={styles.events}>
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const chooseDay = (calendarDate: Moment) => {
        setDate(calendarDate.locale('ru').format('DD.MM.YYYY'));
    };

    const findElemPosition = (event: any) => {
        const closestTd = event.target.closest('td');
        const cardElements = event.target.closest('tbody').querySelector('.containerDiv');
        if (cardElements && !(closestTd.querySelector('.containerDiv'))) {
            cardElements.remove();
        }
        if (!(closestTd.querySelector('.containerDiv'))) {
            containerDiv.classList.add('containerDiv');
            closestTd.append(containerDiv);
            setCardExist(cardExist + 1);
        }
    };

    useEffect(() => {
        if (date) {
            root.render(<CreationCard date={date} />);
        }
    }, [date]);

    return (
        <div ref={calendarRef} onClick={findElemPosition}>
            <ConfigProvider>
                <Calendar
                    locale={calendarOnRu}
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                    onSelect={chooseDay}
                    className={styles.calendar}
                />
            </ConfigProvider>
        </div>
    );
};

export default CalendarFC;