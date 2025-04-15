import express from "express";
import {
  mediaListGet,
  mediaGet,
  mediaPost,
  mediaPut,
  mediaDelete,
  mediaByUserGet,
  mediaListMostLikedGet,
} from "../controllers/mediaController";
import { authenticate, validationErrors } from "../../middlewares";
import { body, param, query } from "express-validator";

const router = express.Router();

///
///
/// Posibly incorporate tag adding to this
///
///
/**
 * @apiDefine all
 * Ei vaadi autentikointia.
 */

router
  .route("/") // route is ...:3002/api/post/
  // Gets a list of all posts

  /**
   * @api {get} / Get all posts
   * @apiName GetPostList
   * @apiGroup Post
   * @apiVersion 1.0.0
   * @apiUse all
   * @apiDescription Hakee kaikki postaukset tietokannasta. Tukee sivutusta query-parametreilla `page` ja `limit`.
   *
   * @apiParam (Query string) {Number} [page=1] Sivunumero (alkaen 1). Oletus: 1
   * @apiParam (Query string) {Number} [limit=10] Tulosten määrä per sivu. Oletus: 10
   *
   * @apiSuccess {Object[]} posts Lista postauksista.
   * @apiSuccess {Number} posts.post_id Postauksen ID.
   * @apiSuccess {Number} posts.user_id Käyttäjän ID.
   * @apiSuccess {String} posts.post_title Postauksen otsikko.
   * @apiSuccess {String} posts.post_description Postauksen kuvaus.
   * @apiSuccess {String} posts.filename Tiedostonimi.
   * @apiSuccess {String} posts.filetype Tiedostotyyppi (esim. image/jpeg).
   * @apiSuccess {Number} posts.filesize Tiedoston koko tavuina.
   * @apiSuccess {String} posts.created_at Luontiaika (ISO 8601).
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * [
   *   {
   *     "post_id": 1,
   *     "user_id": 123,
   *     "post_title": "Ensimmäinen postaus",
   *     "post_description": "Lorem ipsum...",
   *     "filename": "kuva.jpg",
   *     "filetype": "image/jpeg",
   *     "filesize": 204800,
   *     "created_at": "2025-04-15T10:00:00Z"
   *   }
   * ]
   *
   * @apiError (400) BadRequest Virheellinen query-parametri.
   * @apiError (500) InternalServerError Palvelinvirhe.
   */
  .get(
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1 }).toInt(),
    validationErrors,
    mediaListGet
  )
  // Post a new post to database

  /**
   * @api {post}/ Add a new post
   * @apiName CreatePost
   * @apiGroup Post
   * @apiVersion 1.0.0
   * @apiDescription Luo uuden postauksen. Vaatii autentikoinnin (token).
   *
   * @apiHeader {String} Authorization Bearer-token muodossa: `Bearer <token>`
   *
   * @apiBody {String{1..100}} post_title Postauksen otsikko.
   * @apiBody {String{1..2000}} post_description Postauksen kuvaus.
   * @apiBody {String} filename Tiedoston nimi (esim. kuva.jpg).
   * @apiBody {String} filetype Tiedostotyyppi (esim. image/jpeg).
   * @apiBody {Number} filesize Tiedoston koko tavuina.
   *
   * @apiSuccess {String} message Vahvistusviesti.
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Post created"
   *     }
   *
   * @apiError (400) ValidationError Syötteen validointi epäonnistui.
   * @apiError (401) Unauthorized Käyttäjä ei ole kirjautunut sisään.
   * @apiError (500) InternalServerError Palvelinvirhe.
   *
   */
  .post(
    authenticate,
    body("post_title")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 0, max: 100 })
      .escape(),
    body("post_description")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ max: 2000 })
      .escape(),
    body("filename")
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[\w.-]+$/)
      .escape(),
    body("filetype").trim().notEmpty().isMimeType(),
    body("filesize").notEmpty().isInt({ min: 1 }).toInt(),
    validationErrors,
    mediaPost
  );

// Gets the most liked post
router.route("/mostliked").get(mediaListMostLikedGet);

router
  .route("/:id")
  // Get specifict post
  .get(param("id").isInt({ min: 1 }).toInt(), validationErrors, mediaGet)
  // Edits post
  .put(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    body("title")
      .optional()
      .trim()
      .isString()
      .isLength({ min: 3, max: 128 })
      .escape(),
    body("description")
      .optional()
      .trim()
      .isString()
      .isLength({ max: 1000 })
      .escape(),
    validationErrors,
    mediaPut
  )
  // Delete post
  .delete(
    authenticate,
    param("id").isInt({ min: 1 }).toInt(),
    validationErrors,
    mediaDelete
  );

router.route("/byuser/:id").get(mediaByUserGet);

router.route("/bytoken").get(authenticate, mediaByUserGet);

export default router;
