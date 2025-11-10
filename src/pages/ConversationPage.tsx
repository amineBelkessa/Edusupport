import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase-config';
import { useAuth } from '@/context/AuthUserContext';
import { Post, Comment } from '@/types/user';
import styles from './ConversationPage.module.css';
import Image from 'next/image';
import { Layout } from '@/ui/components/layout/layout';
import { REGISTERED } from '@/lib/session-status';

const PostsPage: React.FC = () => {
  const { authUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostText, setNewPostText] = useState<string>('');
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [newCommentText, setNewCommentText] = useState<{ [postId: string]: string }>({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const usersQuery = await getDocs(collection(db, 'users'));
      const loadedPosts: Post[] = [];

      for (const userDoc of usersQuery.docs) {
        const postsQuery = await getDocs(collection(db, `users/${userDoc.id}/posts`));
        postsQuery.forEach((postDoc) => {
          const postData = postDoc.data() as Omit<Post, 'id' | 'userId'>;
          loadedPosts.push({
            id: postDoc.id,
            userId: userDoc.id,
            ...postData,
          });
        });
      }

      setPosts(loadedPosts.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()));

      // Charger les commentaires pour chaque post chargé
      for (const post of loadedPosts) {
        await loadComments(post.userId, post.id);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handlePostSubmit = async () => {
    if (newPostText.trim() === '') return;

    const newPost: Post = {
      id: '',
      userId: authUser.uid,
      authorName: authUser.displayName || 'Amine belkessa',
      authorPhoto: authUser.photoURL,
      text: newPostText,
      timestamp: Timestamp.fromDate(new Date()),
    };

    try {
      const docRef = await addDoc(collection(db, `users/${authUser.uid}/posts`), newPost);
      setPosts(prevPosts => [...prevPosts, { ...newPost, id: docRef.id }]);
      setNewPostText('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCommentSubmit = async (postId: string, commentText: string) => {
    if (!postId || postId.trim() === '' || commentText.trim() === '') return;

    const newComment: Comment = {
      id: '',
      userId: authUser.uid,
      authorName: authUser.displayName || 'karim',
      authorPhoto: authUser.photoURL,
      text: commentText,
      timestamp: Timestamp.fromDate(new Date()),
    };

    try {
      const docRef = await addDoc(collection(db, `users/${authUser.uid}/posts/${postId}/comments`), newComment);

      setComments(prevComments => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), {
          id: docRef.id,
          userId: newComment.userId,
          authorName: newComment.authorName,
          authorPhoto: newComment.authorPhoto,
          text: newComment.text,
          timestamp: newComment.timestamp,
        }],
      }));
      setNewCommentText(prevNewCommentText => ({
        ...prevNewCommentText,
        [postId]: '', // Clear the comment input after submission
      }));
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const loadComments = async (userId: string, postId: string) => {
    if (!postId || postId.trim() === '') {
      console.error('Invalid post ID for loading comments');
      return;
    }

    try {
      const commentsQuery = query(
        collection(db, `users/${userId}/posts/${postId}/comments`),
        orderBy('timestamp')
      );
      const querySnapshot = await getDocs(commentsQuery);
      const loadedComments: Comment[] = [];

      querySnapshot.forEach((doc) => {
        const commentData = doc.data() as Comment;
        loadedComments.push({
          id: doc.id,
          userId: commentData.userId,
          authorName: commentData.authorName,
          authorPhoto: commentData.authorPhoto,
          text: commentData.text,
          timestamp: commentData.timestamp,
        });
      });

      setComments(prevComments => ({
        ...prevComments,
        [postId]: loadedComments,
      }));
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  return (
    <Layout sessionStatus={REGISTERED}>
      <div className={styles.postsPage}>
        <h1>Posts</h1>
        <div className={styles.postsList}>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              comments={comments[post.id] || []}
              newCommentText={newCommentText[post.id] || ''}
              setNewCommentText={(text) => setNewCommentText({ ...newCommentText, [post.id]: text })}
              handleCommentSubmit={handleCommentSubmit}
            />
          ))}
        </div>
        <NewPost
          newPostText={newPostText}
          setNewPostText={setNewPostText}
          handlePostSubmit={handlePostSubmit}
        />
      </div>
    </Layout>
  );
};

const NewPost: React.FC<{
  newPostText: string;
  setNewPostText: React.Dispatch<React.SetStateAction<string>>;
  handlePostSubmit: () => void;
}> = ({ newPostText, setNewPostText, handlePostSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePostSubmit();
    }
  };

  return (
    <div className={styles.newPost}>
      <textarea
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write your post..."
      />
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

const PostItem: React.FC<{
  post: Post;
  comments: Comment[];
  newCommentText: string;
  setNewCommentText: (text: string) => void;
  handleCommentSubmit: (postId: string, commentText: string) => void;
}> = ({ post, comments, newCommentText, setNewCommentText, handleCommentSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(post.id, newCommentText);
      setNewCommentText(''); // Clear the comment input after submission
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.postAuthor}>
        {post.authorPhoto && <Image src={post.authorPhoto} alt={post.authorName} width={50} height={50} />}
        <p>{post.authorName}</p>
      </div>
      <p>{post.text}</p>
      <div className={styles.commentsSection}>
        {comments.map((comment) => (
          <CommentItem key={`${comment.id}-${comment.timestamp.toMillis()}`} comment={comment} />
        ))}
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
        />
        <button onClick={() => handleCommentSubmit(post.id, newCommentText)}>Comment</button>
      </div>
    </div>
  );
};

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
  <div className={styles.comment}>
    <div className={styles.commentAuthor}>
      {comment.authorPhoto && <Image src={comment.authorPhoto} alt={comment.authorName} width={30} height={30} />}
      <p>{comment.authorName}</p>
    </div>
    <p>{comment.text}</p>
  </div>
);

export default PostsPage;
