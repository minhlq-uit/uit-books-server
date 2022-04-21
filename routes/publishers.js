import express from 'express';
import { getAllPublishers, createPublisher, updatePublisher, deletePublisher } from '../controllers/PublisherController.js';
const router = express.Router();

router.route('/publishers')
    .get(getAllPublishers)

router.route('/publisher')
    .post(createPublisher)

router.route('/publisher/:id')
    .put(updatePublisher)
    .delete(deletePublisher)


export default router;


