import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {Likes} from 'ecwtypes/EcoWDBTypes';
import promisePool from '../../lib/db';
import {MessageResponse} from 'ecwtypes/MessageTypes';
import CustomError from '../../classes/CustomError';

// Request a list of likes
const fetchAllLikes = async (): Promise<Likes[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Likes[]>(
    'SELECT * FROM Likes',
  );
  return rows;
};

// Request a list of likes by media item id
const fetchLikesByPostId = async (id: number): Promise<Likes[]> => {
  console.log('SELECT * FROM Likes WHERE post_id = ' + id);
  const [rows] = await promisePool.execute<RowDataPacket[] & Likes[]>(
    'SELECT * FROM Likes WHERE post_id = ?',
    [id],
  );
  return rows;
};

// Request a count of likes by media item id
const fetchLikesCountByPostId = async (id: number): Promise<number> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & {likesCount: number}[]
  >('SELECT COUNT(*) as likesCount FROM Likes WHERE post_id = ?', [id]);
  return rows[0].likesCount;
};

// Request a list of likes by user id
const fetchLikesByUserId = async (id: number): Promise<Likes[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Likes[]>(
    'SELECT * FROM Likes WHERE user_id = ?',
    [id],
  );
  return rows;
};

// Post a new like
const postLike = async (
  post_id: number,
  user_id: number,
): Promise<MessageResponse> => {
  const [existingLike] = await promisePool.execute<RowDataPacket[] & Likes[]>(
    'SELECT * FROM Likes WHERE post_id = ? AND user_id = ?',
    [post_id, user_id],
  );

  if (existingLike.length > 0) {
    throw new CustomError('Like already exists', 400);
  }

  const result = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO Likes (post_id, user_id) VALUES (?, ?)',
    [post_id, user_id],
  );

  if (result[0].affectedRows === 0) {
    throw new CustomError('Can not add like', 500);
  }

  return {message: 'Like added'};
};

// Delete a like
const deleteLike = async (
  like_id: number,
  user_id: number,
): Promise<MessageResponse> => {
  //
  //
  // Rewrite this
  /*     user_level === 'Admin'
        ? 'DELETE FROM Likes WHERE like_id = ?'  :*/
  const sql = 'DELETE FROM Likes WHERE like_id = ? AND user_id = ?';

  /* user_level === 'Admin' ? [like_id] :  */
  const params = [like_id, user_id];
  //
  //
  //

  const [result] = await promisePool.execute<ResultSetHeader>(sql, params);

  if (result.affectedRows === 0) {
    throw new CustomError('Can not remove like', 400);
  }

  return {message: 'Like deleted'};
};

const fetchLikeByPostIdAndUserId = async (
  post_id: number,
  user_id: number,
): Promise<Likes> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Likes[]>(
    'SELECT * FROM Likes WHERE post_id = ? AND user_id = ?',
    [post_id, user_id],
  );
  if (rows.length === 0) {
    throw new CustomError('Like not found', 404);
  }
  return rows[0];
};

const getLikesByPostId = async (post_id: number): Promise<Likes[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Likes[]>(
    'SELECT * FROM Likes WHERE post_id = ?',
    [post_id],
  );
  return rows;
};

export {
  fetchAllLikes,
  fetchLikesByPostId,
  fetchLikesByUserId,
  postLike,
  deleteLike,
  fetchLikesCountByPostId,
  fetchLikeByPostIdAndUserId,
  getLikesByPostId,
};
