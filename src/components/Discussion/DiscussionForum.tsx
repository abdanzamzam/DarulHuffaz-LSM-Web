import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Clock, ThumbsUp, Reply, Flag } from 'lucide-react';

interface DiscussionPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: 'admin' | 'teacher' | 'student';
  content: string;
  createdAt: Date;
  likes: number;
  replies: DiscussionReply[];
}

interface DiscussionReply {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: 'admin' | 'teacher' | 'student';
  content: string;
  createdAt: Date;
  likes: number;
}

interface DiscussionForumProps {
  classId?: string;
  moduleId?: string;
  title?: string;
}

const DiscussionForum: React.FC<DiscussionForumProps> = ({ classId, moduleId, title = 'Forum Diskusi' }) => {
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState<{[key: string]: string}>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock user data - in real app, this would come from auth context
  const currentUser = {
    id: '1',
    name: 'Ahmad Santoso',
    avatar: '/avatars/ahmad.jpg',
    role: 'student' as const
  };

  // Mock data - in real app, this would be fetched from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPosts: DiscussionPost[] = [
        {
          id: '1',
          userId: '2',
          userName: 'Ustadz Farid',
          userAvatar: '/avatars/farid.jpg',
          userRole: 'teacher',
          content: 'Assalamualaikum, ada yang ingin ditanyakan tentang materi thaharah yang telah kita pelajari?',
          createdAt: new Date('2023-06-15T10:00:00'),
          likes: 5,
          replies: [
            {
              id: '101',
              postId: '1',
              userId: '3',
              userName: 'Siti Rahma',
              userAvatar: '/avatars/siti.jpg',
              userRole: 'student',
              content: 'Ustadz, boleh dijelaskan lagi tentang perbedaan wudhu dan tayammum?',
              createdAt: new Date('2023-06-15T10:30:00'),
              likes: 2
            },
            {
              id: '102',
              postId: '1',
              userId: '2',
              userName: 'Ustadz Farid',
              userAvatar: '/avatars/farid.jpg',
              userRole: 'teacher',
              content: 'Baik Siti, wudhu menggunakan air sedangkan tayammum menggunakan debu yang suci. Tayammum dilakukan ketika tidak ada air atau tidak bisa menggunakan air karena alasan tertentu.',
              createdAt: new Date('2023-06-15T11:00:00'),
              likes: 3
            }
          ]
        },
        {
          id: '2',
          userId: '4',
          userName: 'Budi Prakoso',
          userAvatar: '/avatars/budi.jpg',
          userRole: 'student',
          content: 'Saya sudah menyelesaikan video pembelajaran tentang shalat, tapi masih bingung tentang bacaan sujud. Apakah ada referensi tambahan?',
          createdAt: new Date('2023-06-16T09:15:00'),
          likes: 1,
          replies: []
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In real app, this would be an API call
    const newPost: DiscussionPost = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      content: newPostContent,
      createdAt: new Date(),
      likes: 0,
      replies: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyContent[postId]?.trim()) return;
    
    // In real app, this would be an API call
    const newReply: DiscussionReply = {
      id: Date.now().toString(),
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      content: replyContent[postId],
      createdAt: new Date(),
      likes: 0
    };
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setReplyContent({...replyContent, [postId]: ''});
    setReplyingTo(null);
  };

  const handleLikePost = (postId: string) => {
    // In real app, this would be an API call
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    // In real app, this would be an API call
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...post,
          replies: updatedReplies
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <MessageSquare className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      {/* Form untuk membuat post baru */}
      <form onSubmit={handlePostSubmit} className="mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6 text-gray-500" />
              )}
            </div>
          </div>
          <div className="flex-grow">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Tulis pertanyaan atau diskusi..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!newPostContent.trim()}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Kirim
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Daftar post */}
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada diskusi. Mulailah dengan mengajukan pertanyaan.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {post.userAvatar ? (
                      <img src={post.userAvatar} alt={post.userName} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900">{post.userName}</h4>
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                      {post.userRole === 'admin' ? 'Admin' : post.userRole === 'teacher' ? 'Guru' : 'Siswa'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(post.createdAt)}
                  </p>
                  <div className="mt-2 text-gray-700">
                    {post.content}
                  </div>
                  <div className="mt-3 flex items-center space-x-4">
                    <button 
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center text-gray-500 hover:text-primary transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                      className="flex items-center text-gray-500 hover:text-primary transition-colors"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      <span className="text-sm">Balas</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                      <Flag className="h-4 w-4 mr-1" />
                      <span className="text-sm">Laporkan</span>
                    </button>
                  </div>
                  
                  {/* Form untuk membalas post */}
                  {replyingTo === post.id && (
                    <div className="mt-4">
                      <textarea
                        value={replyContent[post.id] || ''}
                        onChange={(e) => setReplyContent({...replyContent, [post.id]: e.target.value})}
                        placeholder="Tulis balasan..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={2}
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleReplySubmit(post.id)}
                          disabled={!replyContent[post.id]?.trim()}
                          className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Kirim
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Daftar balasan */}
                  {post.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="pt-2">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {reply.userAvatar ? (
                                  <img src={reply.userAvatar} alt={reply.userName} className="h-full w-full object-cover" />
                                ) : (
                                  <User className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <h5 className="font-medium text-gray-900">{reply.userName}</h5>
                                <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                                  {reply.userRole === 'admin' ? 'Admin' : reply.userRole === 'teacher' ? 'Guru' : 'Siswa'}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(reply.createdAt)}
                              </p>
                              <div className="mt-1 text-gray-700 text-sm">
                                {reply.content}
                              </div>
                              <div className="mt-2 flex items-center space-x-4">
                                <button 
                                  onClick={() => handleLikeReply(post.id, reply.id)}
                                  className="flex items-center text-gray-500 hover:text-primary transition-colors"
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{reply.likes}</span>
                                </button>
                                <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                                  <Flag className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Laporkan</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;