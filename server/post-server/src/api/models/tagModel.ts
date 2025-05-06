import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {FullPost, Tag, TagResult} from 'ecwtypes/EcoWDBTypes';
import promisePool from '../../lib/db';
import {MessageResponse} from 'ecwtypes/MessageTypes';
import CustomError from '../../classes/CustomError';

// Request a list of tags
const fetchAllTags = async (): Promise<Tag[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Tag[]>(
    'SELECT * FROM Tags',
  );
  return rows;
};

const fetchPostByTagById = async (tag_id: number): Promise<FullPost[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & FullPost[]>(
    `SELECT * FROM posts
     JOIN post_tags ON posts.post_id = post_tags.post_id
     WHERE post_tags.tag_id = ?`,
    [tag_id],
  );
  return rows;
};

// Post a new tag
const postTag = async (
  tag_name: string,
  post_id: number,
): Promise<MessageResponse> => {
  let tag_id = 0;
  // check if tag exists (case insensitive)
  const [tagResult] = await promisePool.query<RowDataPacket[] & Tag[]>(
    'SELECT tag_id FROM Tags WHERE tag_name = ?',
    [tag_name],
  );

  if (tagResult.length === 0) {
    // if tag does not exist create it
    const [insertResult] = await promisePool.execute<ResultSetHeader>(
      'INSERT INTO Tags (tag_name) VALUES (?)',
      [tag_name],
    );
    tag_id = insertResult.insertId;
  } else {
    tag_id = tagResult[0].tag_id;
  }

  const [result] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO post_tags (tag_id, post_id) VALUES (?, ?)',
    [tag_id, post_id],
  );

  if (result.affectedRows === 0) {
    throw new CustomError('Could not find tag', 500);
  }

  return {message: 'Tag added'};
};

// Request a list of tags by media item id
const fetchTagsByPostId = async (id: number): Promise<TagResult[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TagResult[]>(
    `SELECT Tags.tag_id, Tags.tag_name, post_tags.post_id
     FROM Tags
     JOIN post_tags ON Tags.tag_id = post_tags.tag_id
     WHERE post_tags.post_id = ?`,
    [id],
  );
  return rows;
};

// Delete a tag
const deleteTag = async (id: number): Promise<MessageResponse> => {
  const connection = await promisePool.getConnection();
  await connection.beginTransaction();

  try {
    const [result1] = await connection.execute<ResultSetHeader>(
      'DELETE FROM post_tags WHERE tag_id = ?',
      [id],
    );

    const [result2] = await connection.execute<ResultSetHeader>(
      'DELETE FROM Tags WHERE tag_id = ?',
      [id],
    );

    if (result1.affectedRows === 0 && result2.affectedRows === 0) {
      throw new CustomError('Unable to delete tag', 404);
    }

    await connection.commit();
    return {message: 'Tag deleted'};
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const deleteTagFromPost = async (
  tag_id: number,
  post_id: number,
  user_id: number,
): Promise<MessageResponse> => {
  // check if user owns media item
  const [mediaItem] = await promisePool.execute<RowDataPacket[]>(
    'SELECT * FROM posts WHERE post_id = ? AND user_id = ?',
    [post_id, user_id],
  );

  if (mediaItem.length === 0) {
    throw new CustomError('Unable to delete find post to delete tag from', 401);
  }

  const [result] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM post_tags WHERE tag_id = ? AND post_id = ?',
    [tag_id, post_id],
  );

  if (result.affectedRows === 0) {
    throw new CustomError('Unable to delete tag from post', 404);
  }

  return {message: 'Tag deleted from media item'};
};

export {
  fetchAllTags,
  postTag,
  fetchTagsByPostId,
  fetchPostByTagById as fetchFilesByTagById,
  deleteTag,
  deleteTagFromPost,
};
