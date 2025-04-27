import {FullPost, Posts} from 'ecwtypes/EcoWDBTypes';
import {MessageResponse, UploadResponse} from 'ecwtypes/MessageTypes';
import request from 'supertest';
import {Application} from 'express';

const uploadMediaFile = (
  url: string | Application,
  path: string,
  mediaFile: string,
  token: string,
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(path)
      .attach('file', mediaFile)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: UploadResponse = response.body;
          expect(message.message).toBe('file uploaded');
          expect(message.data?.filename).not.toBe('');
          expect(message.data?.filesize).toBeGreaterThan(0);
          expect(message.data?.filetype).not.toBe('');
          resolve(message);
        }
      });
  });
};

const getMediaItems = (url: string | Application): Promise<FullPost[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/media')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const mediaItems: FullPost[] = response.body;
          mediaItems.forEach((mediaItem) => {
            expect(mediaItem.post_id).toBeGreaterThan(0);
            expect(mediaItem.post_title).not.toBe('');
            expect(mediaItem.filename).not.toBe('');
            expect(mediaItem.created_at).not.toBe('');
          });
          resolve(mediaItems);
        }
      });
  });
};

const getMediaItem = (
  url: string | Application,
  id: number,
): Promise<Posts> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/media/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const mediaItem: FullPost = response.body;
          expect(mediaItem.post_id).toBeGreaterThan(0);
          expect(mediaItem.post_title).not.toBe('');
          expect(mediaItem.filename).not.toBe('');
          expect(mediaItem.created_at).not.toBe('');
          /*           expect(mediaItem.filetype).not.toBe('');
          expect(mediaItem.thumbnail).not.toBe('');
          expect(mediaItem.filesize).toBeGreaterThan(0); */
          expect(mediaItem.user_id).toBeGreaterThan(0);
          resolve(mediaItem);
        }
      });
  });
};

const postMediaItem = (
  url: string | Application,
  path: string,
  token: string,
  mediaItem: Partial<Posts>,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    console.log('-------------------------------' + url + path);
    request(url)
      .post(path)
      .set('Authorization', `Bearer ${token}`)
      .send(mediaItem)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Media created');
          resolve(message);
        }
      });
  });
};

const putMediaItem = (
  url: string | Application,
  id: number,
  token: string,
  mediaItem: Omit<Posts, 'post_id' | 'thumbnail' | 'created_at'>,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    console.log('-------------------------------' + url + `/api/media/${id}`);
    request(url)
      .put(`/api/media/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(mediaItem)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Media updated');
          resolve(message);
        }
      });
  });
};

const deleteMediaItem = (
  url: string | Application,
  id: number,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/media/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).toBe('Media deleted');
          resolve(message);
        }
      });
  });
};

// functions to test not found 404 for mediaItem routes
const getNotFoundMediaItem = (
  url: string | Application,
  id: number,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/media/${id}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putNotFoundMediaItem = (
  url: string | Application,
  id: number,
  token: string,
  media_name: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/media/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({media_name})
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteNotFoundMediaItem = (
  url: string | Application,
  id: number,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/media/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

// functions to test invalid data 400 for mediaItem routes
const postInvalidMediaItem = (
  url: string | Application,
  token: string,
  media_name: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/media')
      .set('Authorization', `Bearer ${token}`)
      .send({media_name})
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putInvalidMediaItem = (
  url: string | Application,
  id: string,
  token: string,
  media_name: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/media/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({media_name})
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteInvalidMediaItem = (
  url: string | Application,
  id: string,
  token: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/media/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const getInvalidMediaItem = (
  url: string | Application,
  id: string,
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/media/${id}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const getMediaItemsWithPagination = (
  url: string | Application,
  page: number,
  limit: number,
): Promise<Posts[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/media?page=${page}&limit=${limit}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const mediaItems: Posts[] = response.body;
          expect(mediaItems.length).toBeLessThanOrEqual(limit);
          resolve(mediaItems);
        }
      });
  });
};

const getMostLikedMedia = (url: string | Application): Promise<Posts> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/media/mostliked')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const mediaItem: Posts = response.body;
          expect(mediaItem.post_id).toBeGreaterThan(0);
          resolve(mediaItem);
        }
      });
  });
};

const getMediaByUser = (
  url: string | Application,
  userId: number,
): Promise<Posts[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/media/byuser/${userId}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const mediaItems: Posts[] = response.body;
          mediaItems.forEach((item) => {
            expect(item.user_id).toBe(userId);
          });
          resolve(mediaItems);
        }
      });
  });
};

const getMediaByToken = (
  url: string | Application,
  token: string,
): Promise<Posts[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/media/bytoken')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const mediaItems: Posts[] = response.body;
          resolve(mediaItems);
        }
      });
  });
};

export {
  uploadMediaFile,
  getMediaItems,
  getMediaItem,
  postMediaItem,
  putMediaItem,
  deleteMediaItem,
  getNotFoundMediaItem,
  putNotFoundMediaItem,
  deleteNotFoundMediaItem,
  postInvalidMediaItem,
  putInvalidMediaItem,
  deleteInvalidMediaItem,
  getInvalidMediaItem,
  getMediaItemsWithPagination,
  getMostLikedMedia,
  getMediaByUser,
  getMediaByToken,
};
