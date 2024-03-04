import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { TComments } from '../../types/commonTypes';
import styles from './CommentFC.module.scss';
import { Avatar, Comment, Tooltip, Rate } from 'antd';

type TComment = {
    comment: TComments;
}

const CommentFC: React.FC<TComment> = ({ comment }) => {
    const { fullName, imageSrc, rating, createdAt, message } = comment;
    const normalDate = new Date(createdAt).toLocaleDateString('ru-RU');
    return (
        <Comment
            className={styles.comment}
            avatar={
                <div className={styles.userInf}>
                    <Avatar src={imageSrc} alt={'Аватар автора'} >
                        {!imageSrc && <UserOutlined />}
                    </Avatar>
                    <span className={styles.userName}>{fullName ? fullName : 'Пользователь'}</span>
                </div>
            }
            datetime={
                <Tooltip className={styles.ratingAndTime}>
                    <Rate
                        value={rating}
                        character={({ index }) => +index! < rating
                            ? <StarFilled style={{ color: 'rgb(250, 173, 20)' }} />
                            : <StarOutlined style={{ color: 'rgb(250, 173, 20)' }} />}
                        disabled
                    />
                    <span className={styles.date}>{normalDate}</span>
                </Tooltip>
            }
            content={message}
        />
    )
}

export default CommentFC;