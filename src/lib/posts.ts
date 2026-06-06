import type { BlogPost } from './posts-data/types';
import { postsChunk01 } from './posts-data/chunk-01';
import { postsChunk02 } from './posts-data/chunk-02';
import { postsChunk03 } from './posts-data/chunk-03';
import { postsChunk04 } from './posts-data/chunk-04';
import { postsChunk05 } from './posts-data/chunk-05';
import { postsChunk06 } from './posts-data/chunk-06';

export type { BlogPost };

// Split into chunk files under ./posts-data — a single 5,000+ line array was
// hard to navigate and edit. Each chunk holds 13 posts; order is preserved.
export const posts: BlogPost[] = [
  ...postsChunk01,
  ...postsChunk02,
  ...postsChunk03,
  ...postsChunk04,
  ...postsChunk05,
  ...postsChunk06,
];
