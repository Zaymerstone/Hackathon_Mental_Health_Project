import { supabase } from './supabaseClient';

// Type definitions
export interface ForumPost {
  id: string;
  student_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ForumComment {
  id: string;
  student_id: string;
  post_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateForumPostInput {
  studentId: string;
  title: string;
  content: string;
}

export interface UpdateForumPostInput {
  postId: string;
  studentId: string;
  title: string;
  content: string;
}

export interface CreateForumCommentInput {
  studentId: string;
  postId: string;
  content: string;
}

// Forum Posts CRUD Operations

/**
 * Creates a new forum post
 * @param studentId - The ID of the student creating the post
 * @param title - The title of the post
 * @param content - The content of the post
 * @returns The created forum post
 * @throws Error if creation fails
 */
export async function createForumPost(
  studentId: string,
  title: string,
  content: string
): Promise<ForumPost> {
  if (!studentId) {
    throw new Error('Student ID is required');
  }
  if (!title || title.trim().length === 0) {
    throw new Error('Post title is required');
  }
  if (!content || content.trim().length === 0) {
    throw new Error('Post content is required');
  }

  const { data, error } = await supabase
    .from('forum_posts')
    .insert({
      student_id: studentId,
      title: title.trim(),
      content: content.trim(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create forum post: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to create forum post: No data returned');
  }

  return data as ForumPost;
}

/**
 * Retrieves all forum posts, ordered by creation date (newest first)
 * @returns Array of all forum posts
 * @throws Error if retrieval fails
 */
export async function getAllForumPosts(): Promise<ForumPost[]> {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to retrieve forum posts: ${error.message}`);
  }

  return (data || []) as ForumPost[];
}

/**
 * Retrieves a forum post by its ID
 * @param postId - The ID of the post to retrieve
 * @returns The forum post if found
 * @throws Error if post not found or retrieval fails
 */
export async function getForumPostById(postId: string): Promise<ForumPost> {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error(`Forum post with ID ${postId} not found`);
    }
    throw new Error(`Failed to retrieve forum post: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Forum post with ID ${postId} not found`);
  }

  return data as ForumPost;
}

/**
 * Updates a forum post. Verifies ownership before updating.
 * @param postId - The ID of the post to update
 * @param studentId - The ID of the student attempting to update
 * @param title - The new title
 * @param content - The new content
 * @returns The updated forum post
 * @throws Error if update fails or student is not the owner
 */
export async function updateForumPost(
  postId: string,
  studentId: string,
  title: string,
  content: string
): Promise<ForumPost> {
  if (!postId) {
    throw new Error('Post ID is required');
  }
  if (!studentId) {
    throw new Error('Student ID is required');
  }
  if (!title || title.trim().length === 0) {
    throw new Error('Post title is required');
  }
  if (!content || content.trim().length === 0) {
    throw new Error('Post content is required');
  }

  // First, verify ownership
  const existingPost = await getForumPostById(postId);
  if (existingPost.student_id !== studentId) {
    throw new Error(
      `Unauthorized: Student ${studentId} does not own post ${postId}`
    );
  }

  const { data, error } = await supabase
    .from('forum_posts')
    .update({
      title: title.trim(),
      content: content.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId)
    .eq('student_id', studentId) // Additional safety check
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update forum post: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to update forum post: No data returned');
  }

  return data as ForumPost;
}

/**
 * Deletes a forum post. Verifies ownership before deleting.
 * @param postId - The ID of the post to delete
 * @param studentId - The ID of the student attempting to delete
 * @throws Error if deletion fails or student is not the owner
 */
export async function deleteForumPost(
  postId: string,
  studentId: string
): Promise<void> {
  if (!postId) {
    throw new Error('Post ID is required');
  }
  if (!studentId) {
    throw new Error('Student ID is required');
  }

  // First, verify ownership
  const existingPost = await getForumPostById(postId);
  if (existingPost.student_id !== studentId) {
    throw new Error(
      `Unauthorized: Student ${studentId} does not own post ${postId}`
    );
  }

  const { error } = await supabase
    .from('forum_posts')
    .delete()
    .eq('id', postId)
    .eq('student_id', studentId); // Additional safety check

  if (error) {
    throw new Error(`Failed to delete forum post: ${error.message}`);
  }
}

// Forum Comments CRUD Operations

/**
 * Creates a new comment on a forum post
 * @param studentId - The ID of the student creating the comment
 * @param postId - The ID of the post to comment on
 * @param content - The content of the comment
 * @returns The created comment
 * @throws Error if creation fails or post doesn't exist
 */
export async function createForumComment(
  studentId: string,
  postId: string,
  content: string
): Promise<ForumComment> {
  if (!studentId) {
    throw new Error('Student ID is required');
  }
  if (!postId) {
    throw new Error('Post ID is required');
  }
  if (!content || content.trim().length === 0) {
    throw new Error('Comment content is required');
  }

  // Verify that the post exists
  await getForumPostById(postId);

  const { data, error } = await supabase
    .from('forum_comments')
    .insert({
      student_id: studentId,
      post_id: postId,
      content: content.trim(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create forum comment: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to create forum comment: No data returned');
  }

  return data as ForumComment;
}

/**
 * Retrieves all comments for a specific forum post
 * @param postId - The ID of the post
 * @returns Array of comments for the post, ordered by creation date (oldest first)
 * @throws Error if retrieval fails
 */
export async function getCommentsForPost(
  postId: string
): Promise<ForumComment[]> {
  if (!postId) {
    throw new Error('Post ID is required');
  }

  const { data, error } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to retrieve forum comments: ${error.message}`);
  }

  return (data || []) as ForumComment[];
}

/**
 * Updates a forum comment. Verifies ownership before updating.
 * @param commentId - The ID of the comment to update
 * @param studentId - The ID of the student attempting to update
 * @param content - The new content
 * @returns The updated comment
 * @throws Error if update fails or student is not the owner
 */
export async function updateForumComment(
  commentId: string,
  studentId: string,
  content: string
): Promise<ForumComment> {
  if (!commentId) {
    throw new Error('Comment ID is required');
  }
  if (!studentId) {
    throw new Error('Student ID is required');
  }
  if (!content || content.trim().length === 0) {
    throw new Error('Comment content is required');
  }

  // First, verify ownership
  const { data: existingComment, error: fetchError } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('id', commentId)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      throw new Error(`Forum comment with ID ${commentId} not found`);
    }
    throw new Error(`Failed to retrieve forum comment: ${fetchError.message}`);
  }

  if (!existingComment) {
    throw new Error(`Forum comment with ID ${commentId} not found`);
  }

  if (existingComment.student_id !== studentId) {
    throw new Error(
      `Unauthorized: Student ${studentId} does not own comment ${commentId}`
    );
  }

  const { data, error } = await supabase
    .from('forum_comments')
    .update({
      content: content.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', commentId)
    .eq('student_id', studentId) // Additional safety check
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update forum comment: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to update forum comment: No data returned');
  }

  return data as ForumComment;
}

/**
 * Deletes a forum comment. Verifies ownership before deleting.
 * @param commentId - The ID of the comment to delete
 * @param studentId - The ID of the student attempting to delete
 * @throws Error if deletion fails or student is not the owner
 */
export async function deleteForumComment(
  commentId: string,
  studentId: string
): Promise<void> {
  if (!commentId) {
    throw new Error('Comment ID is required');
  }
  if (!studentId) {
    throw new Error('Student ID is required');
  }

  // First, verify ownership
  const { data: existingComment, error: fetchError } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('id', commentId)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      throw new Error(`Forum comment with ID ${commentId} not found`);
    }
    throw new Error(`Failed to retrieve forum comment: ${fetchError.message}`);
  }

  if (!existingComment) {
    throw new Error(`Forum comment with ID ${commentId} not found`);
  }

  if (existingComment.student_id !== studentId) {
    throw new Error(
      `Unauthorized: Student ${studentId} does not own comment ${commentId}`
    );
  }

  const { error } = await supabase
    .from('forum_comments')
    .delete()
    .eq('id', commentId)
    .eq('student_id', studentId); // Additional safety check

  if (error) {
    throw new Error(`Failed to delete forum comment: ${error.message}`);
  }
}

