import express from 'express';
import {findShortestPath} from '../services';
import {
  BadRequestResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '../core/ApiResponse';

import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.post(
  '/maze',
  asyncHandler(async (req, res) => {
    try {
      const {maze, entry, exit} = req.body;

      if (!maze || !entry || !exit)
        return new BadRequestResponse(
          'Either the maze, entry, or exit are missing'
        ).send(res);

      const shortestPath = findShortestPath(maze, entry, exit);

      if (shortestPath === null)
        return new SuccessMsgResponse('No solution found').send(res);

      return new SuccessResponse('Shortest path found', shortestPath).send(res);
    } catch (error) {
      return new InternalErrorResponse().send(res);
    }
  })
);

export default router;
