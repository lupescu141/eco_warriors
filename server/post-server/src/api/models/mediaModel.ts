import { ResultSetHeader, RowDataPacket } from "mysql2";
import { FullPost } from "ecwtypes/EcoWDBTypes";
import promisePool from "../../lib/db";
import { MessageResponse } from "ecwtypes/MessageTypes";
import CustomError from "../../classes/CustomError";
import { fetchData } from "../../lib/functions";

const uploadPath = process.env.UPLOAD_URL;

// Common SQL fragments
// if mediaItem is an image add '-thumb.png' to filename
// if mediaItem is not image add screenshots property with 5 thumbnails
// uploadPath needs to be passed to the query
// Example usage:
// ....execute(BASE_MEDIA_QUERY, [uploadPath, otherParams]);

const BASE_MEDIA_QUERY = `
  SELECT
    post_id,
    user_id,
    post_title,
    post_description,
    created_at,
    filename,
    filesize,
    filetype,
    CONCAT(?, filename) AS filename,
    CASE
      WHEN filetype LIKE '%image%'
      THEN CONCAT(filename, '-thumb.png')
      ELSE NULL
    END AS thumbnail,
    CASE
      WHEN filetype NOT LIKE '%image%'
      THEN (
        SELECT JSON_ARRAYAGG(
          CONCAT(filename, '-thumb-', numbers.n, '.png')
        )
        FROM (
          SELECT 1 AS n UNION SELECT 2 UNION SELECT 3
          UNION SELECT 4 UNION SELECT 5
        ) numbers
      )
      ELSE NULL
    END AS screenshots
  FROM posts
`;

const fetchAllPost = async (
  page: number | undefined = undefined,
  limit: number | undefined = undefined
): Promise<FullPost[]> => {
  const offset = ((page || 1) - 1) * (limit || 10);
  const sql = `${BASE_MEDIA_QUERY}
    ${limit ? "LIMIT ? OFFSET ?" : ""}`;
  const params = [uploadPath, limit, offset];
  const stmt = promisePool.format(sql, params);

  const [rows] = await promisePool.execute<RowDataPacket[] & FullPost[]>(stmt);
  return rows;
};

const fetchPostById = async (id: number): Promise<FullPost> => {
  const sql = `${BASE_MEDIA_QUERY}
              WHERE post_id=?`;
  const params = [uploadPath, id];
  const stmt = promisePool.format(sql, params);
  console.log(stmt);
  const [rows] = await promisePool.execute<RowDataPacket[] & FullPost[]>(stmt);
  if (rows.length === 0) {
    throw new CustomError("Can not find post", 404);
  }
  return rows[0];
};

const newPost = async (
  media: Omit<FullPost, "post_id" | "created_at" | "thumbnail">
): Promise<FullPost> => {
  const {
    user_id,
    filename,
    filesize,
    filetype,
    post_title,
    post_description,
  } = media;
  const sql = `INSERT INTO posts (user_id, filename, filesize, filetype, post_title, post_description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    user_id,
    filename,
    filesize,
    filetype,
    post_title,
    post_description,
  ];
  const stmt = promisePool.format(sql, params);
  console.log(stmt);
  const [result] = await promisePool.execute<ResultSetHeader>(stmt);
  console.log("newPost", result);
  if (result.affectedRows === 0) {
    throw new CustomError("Unable to post media to database", 500);
  }
  return await fetchPostById(result.insertId);
};

const putPost = async (
  media: Pick<FullPost, "post_title" | "post_description">,
  id: number,
  user_id: number
): Promise<FullPost> => {
  //
  //
  // Rewrite this
  /*     user_level === 'Admin'
      ? 'UPDATE PostItems SET title = ?, description = ? WHERE post_id = ?' : */
  const sql =
    "UPDATE posts SET post_title = ?, post_description = ? WHERE post_id = ? AND user_id = ?";
  /*     user_level === 'Admin'
      ? [media.post_title, media.post_description, id] :*/
  const params = [media.post_title, media.post_description, id, user_id];
  //
  //
  //

  const stmt = promisePool.format(sql, params);
  const [result] = await promisePool.execute<ResultSetHeader>(stmt);

  if (result.affectedRows === 0) {
    throw new CustomError("Can not update media", 404);
  }

  return await fetchPostById(id);
};

const deletePost = async (
  post_id: number,
  user_id: number,
  token: string
): Promise<MessageResponse> => {
  const media = await fetchPostById(post_id);

  if (!media) {
    return { message: "Post not found" };
  }

  media.filename = media?.filename.replace(
    process.env.UPLOAD_URL as string,
    ""
  );

  const connection = await promisePool.getConnection();

  await connection.beginTransaction();

  await connection.execute("DELETE FROM likes WHERE post_id = ?;", [post_id]);

  await connection.execute("DELETE FROM comments WHERE post_id = ?;", [
    post_id,
  ]);

  //
  //
  // Rewrite this
  /*     level_name === 'Admin'
        ? connection.format('DELETE FROM PostItems WHERE post_id = ?', [post_id]) : */
  const sql = connection.format(
    "DELETE FROM posts WHERE post_id = ? AND user_id = ?",
    [post_id, user_id]
  );
  //
  //
  //

  const [result] = await connection.execute<ResultSetHeader>(sql);

  if (result.affectedRows === 0) {
    return { message: "Post not deleted" };
  }

  const options = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const deleteResult = await fetchData<MessageResponse>(
      `${process.env.UPLOAD_SERVER}/delete/${media.filename}`,
      options
    );

    console.log("deleteResult", deleteResult);
  } catch (e) {
    console.error("deletePost file delete error:", (e as Error).message);
  }

  await connection.commit();

  return {
    message: "Post deleted",
  };
};

const fetchPostByUserId = async (user_id: number): Promise<FullPost[]> => {
  const sql = `${BASE_MEDIA_QUERY} WHERE user_id = ?`;
  const params = [uploadPath, user_id];
  const stmt = promisePool.format(sql, params);
  console.log(stmt);

  const [rows] = await promisePool.execute<RowDataPacket[] & FullPost[]>(stmt);
  return rows;
};

const fetchMostLikedPost = async (): Promise<FullPost> => {
  // you could also use a view for this
  const sql = `${BASE_MEDIA_QUERY}
     WHERE post_id = (
       SELECT post_id FROM Likes
       GROUP BY post_id
       ORDER BY COUNT(*) DESC
       LIMIT 1
     )`;
  const params = [uploadPath];
  const stmt = promisePool.format(sql, params);
  console.log(stmt);

  const [rows] = await promisePool.execute<
    RowDataPacket[] & FullPost[] & { likes_count: number }
  >(stmt);

  if (!rows.length) {
    throw new CustomError("Most liked post not found", 404);
  }
  return rows[0];
};

export {
  fetchAllPost,
  fetchPostById,
  newPost,
  deletePost,
  fetchMostLikedPost,
  fetchPostByUserId,
  putPost,
};
