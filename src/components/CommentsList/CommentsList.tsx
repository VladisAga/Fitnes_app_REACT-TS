import CommentFC from '@components/CommentFC/CommentFC';

import { TComments } from '../../types/commonTypes';

import styles from './CommentsList.module.scss';

type TCommentsList = {
    comments: TComments[];
    showComments: boolean;
}

const CommentsList: React.FC<TCommentsList> = ({ comments, showComments }) => {
    const slicedComments = showComments ? comments : comments.slice(0, 4);

    return (
        <ul className={styles.commentsList}>
            {slicedComments.map((comment) => (
                <li className={styles.comment} key={comment.id}>
                    <CommentFC comment={comment} />
                </li>
            ))}
        </ul>
    );
}

export default CommentsList;
