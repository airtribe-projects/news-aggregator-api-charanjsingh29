import Router from "express";
import { 
    getNews
} from "../controllers/news.controller.js";

const router = Router();
router.get('/', getNews)
/* router.post('/:id/read', markAsRead)
router.post('/:id/favorite', markAsFavorite)
router.get('/read', getAllRead)
router.get('/favorites', getAllFavorite)
router.get('/search/:keyword', getNews) */

export default router