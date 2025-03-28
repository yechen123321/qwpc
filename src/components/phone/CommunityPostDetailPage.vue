<template>
    <div class="post-detail-page" :class="{ 'dark-mode': isDarkMode }">
      <!-- Header with back button and actions -->
      <header class="page-header">
        <div class="header-actions">
          <button class="icon-btn back-btn" @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          <div class="header-right">
            <button class="icon-btn" @click="toggleBookmark">
              <svg v-if="isBookmarked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
            </button>
            <button class="icon-btn" @click="toggleShare">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg>
            </button>
            <button class="icon-btn" @click="toggleMoreOptions">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </button>
          </div>
        </div>
      </header>
      
      <!-- Main content -->
      <main class="post-content">
        <!-- Post category and title -->
        <div class="post-header">
          <div class="post-category">{{ post.category }}</div>
          <h1 class="post-title">{{ post.title }}</h1>
        </div>
        
        <!-- Author info and post meta -->
        <div class="author-container">
          <div class="author-info" @click="viewAuthorProfile">
            <div class="author-avatar">
              <img :src="post.author.avatar" :alt="post.author.name">
              <div v-if="post.author.isVerified" class="verified-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
            <div class="author-details">
              <div class="author-name">{{ post.author.name }}</div>
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.createdAt) }}</span>
                <span class="post-views">{{ formatNumber(post.views) }} 阅读</span>
              </div>
            </div>
          </div>
          <button class="follow-btn" :class="{ 'following': isFollowing }" @click="toggleFollow">
            {{ isFollowing ? '已关注' : '关注' }}
          </button>
        </div>
        
        <!-- Post body content -->
        <div class="post-body">
          <p v-for="(paragraph, index) in post.content" :key="index" class="content-paragraph">
            {{ paragraph }}
          </p>
          
          <!-- Image gallery -->
          <div v-if="post.images && post.images.length" class="image-gallery">
            <div class="gallery-container" :class="{ 'single-image': post.images.length === 1 }">
              <div 
                v-for="(image, imgIndex) in post.images" 
                :key="imgIndex" 
                class="gallery-item"
                @click="openGallery(imgIndex)"
              >
                <img :src="image.url" :alt="image.caption || '图片'" class="gallery-image">
              </div>
            </div>
            <div v-if="post.images.length > 1" class="gallery-indicator">
              <span v-for="(image, i) in post.images" :key="i" class="indicator-dot" :class="{ 'active': currentImageIndex === i }"></span>
            </div>
          </div>
          
          <!-- Video embed -->
          <div v-if="post.video" class="video-container">
            <div class="video-player">
              <img :src="post.video.thumbnail" alt="视频缩略图" class="video-thumbnail">
              <button class="play-btn" @click="playVideo">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </button>
            </div>
            <div class="video-caption">{{ post.video.caption }}</div>
          </div>
          
          <!-- Tags -->
          <div v-if="post.tags && post.tags.length" class="post-tags">
            <div 
              v-for="(tag, index) in post.tags" 
              :key="index" 
              class="tag"
              @click="searchByTag(tag)"
            >
              #{{ tag }}
            </div>
          </div>
        </div>
        
        <!-- Post actions -->
        <div class="post-actions">
          <div class="action-group">
            <button class="action-btn" :class="{ 'active': isLiked }" @click="toggleLike">
              <svg v-if="isLiked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              <span>{{ formatNumber(post.likes) }}</span>
            </button>
            <button class="action-btn" :class="{ 'active': isDisliked }" @click="toggleDislike">
              <svg v-if="isDisliked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm10-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm10-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path></svg>
              <span>{{ formatNumber(post.dislikes) }}</span>
            </button>
          </div>
          <div class="action-group">
            <button class="action-btn" @click="scrollToComments">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>{{ formatNumber(post.comments.length) }}</span>
            </button>
            <button class="action-btn" @click="toggleShare">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
              <span>分享</span>
            </button>
          </div>
        </div>
        
        <!-- Comments section -->
        <div id="comments-section" class="comments-section">
          <h2 class="section-title">评论 ({{ post.comments.length }})</h2>
          
          <!-- Comment input -->
          <div class="comment-input-container">
            <div class="user-avatar">
              <img :src="currentUser.avatar" :alt="currentUser.name">
            </div>
            <div class="comment-input-wrapper" @click="focusCommentInput">
              <input 
                ref="commentInput"
                type="text" 
                v-model="newComment" 
                placeholder="添加评论..." 
                class="comment-input"
                @focus="showCommentTools = true"
              >
              <div v-if="showCommentTools" class="comment-tools">
                <button class="tool-btn" @click="addEmoji">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
                </button>
                <button class="tool-btn" @click="addImage">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>
                </button>
                <button class="tool-btn" @click="addGif">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="M10 4v16"></path><path d="M2 9.5h8"></path><path d="M2 14.5h8"></path><path d="M14 16.5h2.5a2.5 2.5 0 0 0 0-5H14v-3"></path><path d="M20 7.5h-4"></path></svg>
                </button>
                <button 
                  class="post-comment-btn" 
                  :disabled="!newComment.trim()" 
                  @click="postComment"
                >
                  发布
                </button>
              </div>
            </div>
          </div>
          
          <!-- Comments list -->
          <div class="comments-list">
            <div v-if="post.comments.length === 0" class="no-comments">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <p>暂无评论，成为第一个评论的人吧！</p>
            </div>
            
            <div 
              v-for="(comment, index) in post.comments" 
              :key="index" 
              class="comment-item"
            >
              <div class="comment-avatar">
                <img :src="comment.user.avatar" :alt="comment.user.name">
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <div class="comment-user">{{ comment.user.name }}</div>
                  <div class="comment-meta">{{ formatTimeAgo(comment.createdAt) }}</div>
                </div>
                <div class="comment-text">{{ comment.text }}</div>
                <div class="comment-actions">
                  <button class="comment-action" @click="likeComment(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span>{{ formatNumber(comment.likes) }}</span>
                  </button>
                  <button class="comment-action" @click="replyToComment(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>
                    <span>回复</span>
                  </button>
                </div>
                
                <!-- Nested replies -->
                <div v-if="comment.replies && comment.replies.length" class="comment-replies">
                  <div 
                    v-for="(reply, replyIndex) in comment.replies" 
                    :key="replyIndex" 
                    class="reply-item"
                  >
                    <div class="reply-avatar">
                      <img :src="reply.user.avatar" :alt="reply.user.name">
                    </div>
                    <div class="reply-content">
                      <div class="reply-header">
                        <div class="reply-user">{{ reply.user.name }}</div>
                        <div class="reply-meta">{{ formatTimeAgo(reply.createdAt) }}</div>
                      </div>
                      <div class="reply-text">
                        <span v-if="reply.replyTo" class="reply-to">@{{ reply.replyTo }} </span>
                        {{ reply.text }}
                      </div>
                      <div class="reply-actions">
                        <button class="reply-action" @click="likeReply(index, replyIndex)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                          <span>{{ formatNumber(reply.likes) }}</span>
                        </button>
                        <button class="reply-action" @click="replyToReply(index, reply.user.name)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>
                          <span>回复</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button v-if="comment.replies.length > 2" class="view-more-replies" @click="viewMoreReplies(index)">
                    查看更多回复 ({{ comment.replies.length - 2 }})
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <button v-if="post.comments.length > 5" class="load-more-btn" @click="loadMoreComments">
            加载更多评论
          </button>
        </div>
        
        <!-- Related posts -->
        <!-- <div class="related-posts">
          <h2 class="section-title">相关帖子</h2>
          <div class="related-posts-list">
            <div 
              v-for="(relatedPost, index) in post.relatedPosts" 
              :key="index" 
              class="related-post-item"
              @click="viewRelatedPost(relatedPost.id)"
            >
              <div class="related-post-image" v-if="relatedPost.image">
                <img :src="relatedPost.image" :alt="relatedPost.title">
              </div>
              <div class="related-post-info">
                <div class="related-post-title">{{ relatedPost.title }}</div>
                <div class="related-post-meta">
                  <span>{{ relatedPost.author }}</span>
                  <span>{{ formatNumber(relatedPost.likes) }} 赞</span>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </main>
      
      <!-- Share modal -->
      <div class="modal-overlay" v-if="showShareModal" @click="toggleShare">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>分享帖子</h3>
            <button class="close-btn" @click="toggleShare">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <div class="modal-content">
            <div class="share-options">
              <button class="share-option">
                <div class="share-icon wechat">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1"></path></svg>
                </div>
                <span>微信</span>
              </button>
              <button class="share-option">
                <div class="share-icon weibo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <span>微博</span>
              </button>
              <button class="share-option">
                <div class="share-icon qq">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <span>QQ</span>
              </button>
              <button class="share-option">
                <div class="share-icon copy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                </div>
                <span>复制链接</span>
              </button>
            </div>
            <div class="share-link-container">
              <input type="text" readonly :value="shareUrl" class="share-link-input">
              <button class="copy-btn" @click="copyShareLink">复制</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- More options modal -->
      <div class="modal-overlay" v-if="showMoreOptionsModal" @click="toggleMoreOptions">
        <div class="modal-container options-modal" @click.stop>
          <div class="options-list">
            <button class="option-item" @click="reportPost">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
              <span>举报</span>
            </button>
            <button class="option-item" @click="blockUser">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 14.14 14.14"></path></svg>
              <span>屏蔽此用户</span>
            </button>
            <button class="option-item" @click="notInterested">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle><path d="m7.5 7.5 9 9"></path></svg>
              <span>不感兴趣</span>
            </button>
            <button class="option-item" @click="toggleDarkMode">
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              <span>{{ isDarkMode ? '浅色模式' : '深色模式' }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Image gallery modal -->
      <div class="gallery-modal" v-if="showGalleryModal" @click="closeGallery">
        <div class="gallery-header">
          <div class="gallery-counter">{{ currentGalleryIndex + 1 }} / {{ post.images.length }}</div>
          <button class="close-btn" @click="closeGallery">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <div class="gallery-content" @click.stop>
          <button class="gallery-nav prev" @click.stop="prevImage" v-if="currentGalleryIndex > 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          
          <div class="gallery-image-wrapper" @click.stop>
            <img :src="post.images[currentGalleryIndex].url" :alt="post.images[currentGalleryIndex].caption || '图片'" class="gallery-full-image">
          </div>
          
          <button class="gallery-nav next" @click.stop="nextImage" v-if="currentGalleryIndex < post.images.length - 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </button>
        </div>
        <div class="gallery-caption" v-if="post.images[currentGalleryIndex].caption">
          {{ post.images[currentGalleryIndex].caption }}
        </div>
      </div>
      
      <!-- Toast message -->
      <div class="toast-message" v-if="showToast">
        <div class="toast-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // State
  const isDarkMode = ref(false);
  const isBookmarked = ref(false);
  const isFollowing = ref(false);
  const isLiked = ref(false);
  const isDisliked = ref(false);
  const showShareModal = ref(false);
  const showMoreOptionsModal = ref(false);
  const showGalleryModal = ref(false);
  const showCommentTools = ref(false);
  const showToast = ref(false);
  const toastMessage = ref('');
  const newComment = ref('');
  const currentGalleryIndex = ref(0);
  const currentImageIndex = ref(0);
  
  // Mock data for current user
  const currentUser = ref({
    id: 'user123',
    name: '当前用户',
    avatar: 'src/assets/avatar.png?height=40&width=40'
  });
  
  // Mock data for the post
  const post = ref({
    id: 'post123',
    title: '探索城市中的绿色空间：都市中的自然避风港',
    category: '城市生活',
    createdAt: '2023-11-15T08:30:00Z',
    views: 1243,
    likes: 328,
    dislikes: 12,
    author: {
      id: 'author456',
      name: '城市探索者',
      avatar: 'src/assets/avatar.png?height=50&width=50',
      isVerified: true
    },
    content: [
      '在钢筋混凝土构成的城市丛林中，绿色空间如同珍贵的绿洲，为忙碌的都市人提供了一处喘息之地。本文将带您探索城市中那些被忽视的绿色角落，发现都市中的自然之美。',
      '城市公园不仅仅是休闲娱乐的场所，更是城市生态系统的重要组成部分。它们为城市降温、净化空气、减少噪音污染，同时也为城市居民提供了亲近自然的机会。研究表明，定期接触自然环境有助于减轻压力，改善心理健康。',
      '除了传统的城市公园，现代城市中还出现了许多创新的绿色空间形式。屋顶花园、垂直绿化墙、社区菜园等，这些小型绿色空间在有限的城市空间中最大化地利用了每一寸土地，为城市增添了生机与活力。',
      '在我们的城市探索中，发现了几处特别值得一提的绿色空间。它们或许不如大型公园那样广为人知，但却各具特色，为城市增添了独特的魅力。'
    ],
    images: [
      { url: '/placeholder.svg?height=400&width=600', caption: '城市中心的小型绿地公园' },
      { url: '/placeholder.svg?height=400&width=600', caption: '创意垂直绿化墙，为建筑增添生机' },
      { url: '/placeholder.svg?height=400&width=600', caption: '社区共享花园，居民共同参与种植' },
      { url: '/placeholder.svg?height=400&width=600', caption: '废弃铁轨改造的空中花园' }
    ],
    video: {
      thumbnail: '/placeholder.svg?height=300&width=500',
      url: 'https://example.com/video.mp4',
      caption: '城市绿色空间探索视频记录'
    },
    tags: ['城市探索', '绿色空间', '都市生活', '自然保护', '城市规划'],
    comments: [
      {
        id: 'comment1',
        user: {
          id: 'user1',
          name: '自然爱好者',
          avatar: 'src/assets/avatar.png?height=40&width=40'
        },
        text: '非常喜欢这篇文章！我也是城市绿色空间的忠实粉丝，每周末都会去探索不同的公园。最近发现了一个废弃工厂改造的生态公园，非常值得一去。',
        createdAt: '2023-11-15T10:15:00Z',
        likes: 24,
        replies: [
          {
            id: 'reply1',
            user: {
              id: 'user2',
              name: '城市规划师',
              avatar: 'src/assets/avatar.png?height=40&width=40'
            },
            text: '废弃工厂改造的公园是近年来城市更新的一个很好的例子，既保留了工业遗产，又创造了新的绿色空间。',
            createdAt: '2023-11-15T11:30:00Z',
            likes: 8,
            replyTo: '自然爱好者'
          },
          {
            id: 'reply2',
            user: {
              id: 'author456',
              name: '城市探索者',
              avatar: 'src/assets/avatar.png?height=40&width=40'
            },
            text: '谢谢分享！能告诉我这个公园的具体位置吗？我很想去看看并在下一篇文章中介绍它。',
            createdAt: '2023-11-15T12:45:00Z',
            likes: 5,
            replyTo: '自然爱好者'
          }
        ]
      },
      {
        id: 'comment2',
        user: {
          id: 'user3',
          name: '环保志愿者',
          avatar: 'src/assets/avatar.png?height=40&width=40'
        },
        text: '城市绿化对改善空气质量和减缓城市热岛效应有很大帮助。希望更多人能关注这个话题，支持城市绿化项目。',
        createdAt: '2023-11-15T14:20:00Z',
        likes: 18,
        replies: []
      },
      {
        id: 'comment3',
        user: {
          id: 'user4',
          name: '摄影爱好者',
          avatar: 'src/assets/avatar.png?height=40&width=40'
        },
        text: '图片拍得真美！特别是那个垂直绿化墙，构图很有创意。请问是用什么相机拍摄的？',
        createdAt: '2023-11-16T09:10:00Z',
        likes: 12,
        replies: [
          {
            id: 'reply3',
            user: {
              id: 'author456',
              name: '城市探索者',
              avatar: 'src/assets/avatar.png?height=40&width=40'
            },
            text: '谢谢夸奖！这是用索尼A7III拍摄的，镜头是24-70mm F2.8。',
            createdAt: '2023-11-16T10:05:00Z',
            likes: 3,
            replyTo: '摄影爱好者'
          }
        ]
      }
    ],
    relatedPosts: [
      {
        id: 'related1',
        title: '城市屋顶花园设计指南：打造你的空中绿洲',
        author: '园艺设计师',
        image: 'src/assets/avatar.png?height=120&width=200',
        likes: 156
      },
      {
        id: 'related2',
        title: '城市中的野生动物：都市生态系统中的隐秘居民',
        author: '野生动物学家',
        image: 'src/assets/avatar.png?height=120&width=200',
        likes: 203
      },
      {
        id: 'related3',
        title: '社区花园如何增强邻里关系：案例研究',
        author: '社区工作者',
        image: 'src/assets/avatar.png?height=120&width=200',
        likes: 89
      }
    ]
  });
  
  // Computed properties
  const shareUrl = computed(() => {
    return `https://example.com/posts/${post.value.id}`;
  });
  
  // Methods
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    toggleMoreOptions();
  }
  
  function toggleBookmark() {
    isBookmarked.value = !isBookmarked.value;
    showToast.value = true;
    toastMessage.value = isBookmarked.value ? '已添加到收藏' : '已从收藏中移除';
    
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }
  
  function toggleShare() {
    showShareModal.value = !showShareModal.value;
  }
  
  function toggleMoreOptions() {
    showMoreOptionsModal.value = !showMoreOptionsModal.value;
  }
  
  function toggleFollow() {
    isFollowing.value = !isFollowing.value;
    showToast.value = true;
    toastMessage.value = isFollowing.value ? '已关注作者' : '已取消关注';
    
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }
  
  function toggleLike() {
    if (isDisliked.value) {
      isDisliked.value = false;
      post.value.dislikes--;
    }
    
    isLiked.value = !isLiked.value;
    if (isLiked.value) {
      post.value.likes++;
    } else {
      post.value.likes--;
    }
  }
  
  function toggleDislike() {
    if (isLiked.value) {
      isLiked.value = false;
      post.value.likes--;
    }
    
    isDisliked.value = !isDisliked.value;
    if (isDisliked.value) {
      post.value.dislikes++;
    } else {
      post.value.dislikes--;
    }
  }
  
  function openGallery(index) {
    currentGalleryIndex.value = index;
    showGalleryModal.value = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeGallery() {
    showGalleryModal.value = false;
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function prevImage() {
    if (currentGalleryIndex.value > 0) {
      currentGalleryIndex.value--;
    }
  }
  
  function nextImage() {
    if (currentGalleryIndex.value < post.value.images.length - 1) {
      currentGalleryIndex.value++;
    }
  }
  
  function playVideo() {
    // In a real app, this would play the video
    console.log('Play video:', post.value.video.url);
  }
  
  function copyShareLink() {
    navigator.clipboard.writeText(shareUrl.value)
      .then(() => {
        showToast.value = true;
        toastMessage.value = '链接已复制到剪贴板';
        
        setTimeout(() => {
          showToast.value = false;
        }, 2000);
        
        toggleShare();
      })
      .catch(err => {
        console.error('无法复制链接: ', err);
      });
  }
  
  function scrollToComments() {
    document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
  }
  
  function focusCommentInput() {
    const commentInput = document.querySelector('.comment-input');
    if (commentInput) {
      commentInput.focus();
    }
  }
  
  function addEmoji() {
    // In a real app, this would open an emoji picker
    newComment.value += '😊';
  }
  
  function addImage() {
    // In a real app, this would open an image picker
    console.log('Add image to comment');
  }
  
  function addGif() {
    // In a real app, this would open a GIF picker
    console.log('Add GIF to comment');
  }
  
  function postComment() {
    if (!newComment.value.trim()) return;
    
    // Add new comment to the list
    post.value.comments.unshift({
      id: `comment${post.value.comments.length + 1}`,
      user: currentUser.value,
      text: newComment.value,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    });
    
    // Clear input and hide tools
    newComment.value = '';
    showCommentTools.value = false;
    
    // Show success toast
    showToast.value = true;
    toastMessage.value = '评论发布成功';
    
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }
  
  function likeComment(index) {
    post.value.comments[index].likes++;
  }
  
  function replyToComment(index) {
    // Focus comment input and prefill with @username
    newComment.value = `@${post.value.comments[index].user.name} `;
    focusCommentInput();
    showCommentTools.value = true;
  }
  
  function likeReply(commentIndex, replyIndex) {
    post.value.comments[commentIndex].replies[replyIndex].likes++;
  }
  
  function replyToReply(commentIndex, username) {
    // Focus comment input and prefill with @username
    newComment.value = `@${username} `;
    focusCommentInput();
    showCommentTools.value = true;
  }
  
  function viewMoreReplies(index) {
    // In a real app, this would show all replies
    console.log('View more replies for comment:', index);
  }
  
  function loadMoreComments() {
    // In a real app, this would load more comments from the server
    console.log('Load more comments');
  }
  
  function viewRelatedPost(postId) {
    // In a real app, this would navigate to the related post
    console.log('View related post:', postId);
  }
  
  function searchByTag(tag) {
    // In a real app, this would search for posts with the same tag
    console.log('Search by tag:', tag);
  }
  
  function reportPost() {
    showToast.value = true;
    toastMessage.value = '举报已提交，感谢您的反馈';
    
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
    
    toggleMoreOptions();
  }
  
  function blockUser() {
    showToast.value = true;
    toastMessage.value = '已屏蔽该用户';
    
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
    
    toggleMoreOptions();
  }
  
  function notInterested() {
    showToast.value = true;
    toastMessage.value = '已减少此类内容的推荐';
    
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
    
    toggleMoreOptions();
  }
  
  function viewAuthorProfile() {
    // In a real app, this would navigate to the author's profile
    console.log('View author profile:', post.value.author.id);
  }
  
  function goBack() {
    // In a real app, this would navigate back
    console.log('Go back');
  }
  
  // Utility functions
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return '刚刚';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}分钟前`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}小时前`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)}天前`;
    } else {
      return formatDate(dateString);
    }
  }
  
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
    }
    
    // Set up image gallery swipe (in a real app)
    // setupGallerySwipe();
  });
  </script>
  
  <style>
  :root {
    --primary-color: #10b981;
    --primary-light: #10b981;
    --primary-dark: #10b981;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-tertiary: #9ca3af;
    --background-light: #f9fafb;
    --background-white: #ffffff;
    --border-color: #e5e7eb;
    --success-color: #10b981;
    --error-color: #ef4444;
    --warning-color: #f59e0b;
    
    --box-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --border-radius-sm: 0.375rem;
    --border-radius: 0.5rem;
    --border-radius-lg: 0.75rem;
    --transition: all 0.3s ease;
    
    /* Share icons */
    --wechat-color: #07C160;
    --weibo-color: #E6162D;
    --qq-color: #12B7F5;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  
  body {
    background-color: var(--background-light);
    color: var(--text-primary);
    line-height: 1.6;
  }
  
  .post-detail-page {
    max-width: 768px;
    margin: 0 auto;
    background-color: var(--background-white);
    min-height: 100vh;
  }
  
  /* Dark mode styles */
  .dark-mode {
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-tertiary: #9ca3af;
    --background-light: #111827;
    --background-white: #1f2937;
    --border-color: #374151;
  }
  
  /* Header styles */
  .page-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--background-white);
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-right {
    display: flex;
    gap: 0.5rem;
  }
  
  .icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--background-light);
    color: var(--text-secondary);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .icon-btn:hover {
    background-color: var(--border-color);
  }
  
  .back-btn {
    margin-right: 0.5rem;
  }
  
  /* Post content styles */
  .post-content {
    padding: 1.25rem;
  }
  
  .post-header {
    margin-bottom: 1.25rem;
  }
  
  .post-category {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background-color: var(--primary-light);
    color: white;
    border-radius: 50px;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
  
  .post-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-primary);
  }
  
  /* Author info styles */
  .author-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }
  
  .author-avatar {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .author-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .verified-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--background-white);
  }
  
  .author-details {
    display: flex;
    flex-direction: column;
  }
  
  .author-name {
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .post-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }
  
  .follow-btn {
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .follow-btn:hover {
    background-color: var(--primary-dark);
  }
  
  .follow-btn.following {
    background-color: var(--background-light);
    color: var(--text-secondary);
  }
  
  /* Post body styles */
  .post-body {
    margin-bottom: 1.5rem;
  }
  
  .content-paragraph {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: var(--text-primary);
    line-height: 1.7;
  }
  
  /* Image gallery styles */
  .image-gallery {
    margin: 1.5rem 0;
  }
  
  .gallery-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .gallery-container.single-image {
    grid-template-columns: 1fr;
  }
  
  .gallery-item {
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .gallery-item:hover .gallery-image {
    transform: scale(1.05);
  }
  
  .gallery-indicator {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  
  .indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--border-color);
    transition: var(--transition);
  }
  
  .indicator-dot.active {
    background-color: var(--primary-color);
    width: 16px;
    border-radius: 4px;
  }
  
  /* Video container styles */
  .video-container {
    margin: 1.5rem 0;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .video-player {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    cursor: pointer;
  }
  
  .video-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .play-btn:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .video-caption {
    padding: 0.75rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    background-color: var(--background-light);
  }
  
  /* Tags styles */
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  
  .tag {
    padding: 0.5rem 0.75rem;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .tag:hover {
    background-color: var(--border-color);
  }
  
  /* Post actions styles */
  .post-actions {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1.5rem;
  }
  
  .action-group {
    display: flex;
    gap: 1.5rem;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .action-btn:hover {
    color: var(--text-primary);
  }
  
  .action-btn.active {
    color: var(--primary-color);
  }
  
  /* Comments section styles */
  .comments-section {
    margin-bottom: 2rem;
    scroll-margin-top: 1rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
  }
  
  .comment-input-container {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .comment-input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .comment-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.95rem;
    background-color: var(--background-light);
    color: var(--text-primary);
  }
  
  .comment-tools {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .tool-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--background-light);
    color: var(--text-secondary);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .tool-btn:hover {
    background-color: var(--border-color);
  }
  
  .post-comment-btn {
    margin-left: auto;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .post-comment-btn:hover {
    background-color: var(--primary-dark);
  }
  
  .post-comment-btn:disabled {
    background-color: var(--border-color);
    cursor: not-allowed;
  }
  
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .no-comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    color: var(--text-tertiary);
    text-align: center;
  }
  
  .comment-item {
    display: flex;
    gap: 0.75rem;
  }
  
  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .comment-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .comment-content {
    flex: 1;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  
  .comment-user {
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .comment-meta {
    font-size: 0.85rem;
    color: var(--text-tertiary);
  }
  
  .comment-text {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: var(--text-primary);
  }
  
  .comment-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .comment-action {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: var(--text-tertiary);
    font-size: 0.85rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .comment-action:hover {
    color: var(--text-secondary);
  }
  
  .comment-replies {
    margin-top: 0.75rem;
    padding-left: 1rem;
    border-left: 2px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .reply-item {
    display: flex;
    gap: 0.75rem;
  }
  
  .reply-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .reply-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .reply-content {
    flex: 1;
  }
  
  .reply-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  
  .reply-user {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.9rem;
  }
  
  .reply-meta {
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }
  
  .reply-text {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-primary);
  }
  
  .reply-to {
    color: var(--primary-color);
    font-weight: 500;
  }
  
  .reply-actions {
    display: flex;
    gap: 1rem;
  }
  
  .reply-action {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: var(--text-tertiary);
    font-size: 0.8rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .reply-action:hover {
    color: var(--text-secondary);
  }
  
  .view-more-replies {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0.25rem 0;
    transition: var(--transition);
  }
  
  .view-more-replies:hover {
    text-decoration: underline;
  }
  
  .load-more-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--background-light);
    border: none;
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    font-size: 0.95rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: var(--transition);
  }
  
  .load-more-btn:hover {
    background-color: var(--border-color);
  }
  
  /* Related posts styles */
  .related-posts {
    margin-bottom: 2rem;
  }
  
  .related-posts-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .related-post-item {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .related-post-item:hover {
    background-color: var(--border-color);
  }
  
  .related-post-image {
    width: 80px;
    height: 60px;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .related-post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .related-post-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .related-post-title {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.95rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .related-post-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-container {
    background-color: var(--background-white);
    border-radius: var(--border-radius-lg);
    width: 90%;
    max-width: 400px;
    box-shadow: var(--box-shadow);
    animation: slideUp 0.3s ease;
  }
  
  .options-modal {
    width: 80%;
    max-width: 300px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .modal-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: none;
    border: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .modal-content {
    padding: 1.25rem;
  }
  
  .share-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .share-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .share-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .share-icon.wechat {
    background-color: var(--wechat-color);
  }
  
  .share-icon.weibo {
    background-color: var(--weibo-color);
  }
  
  .share-icon.qq {
    background-color: var(--qq-color);
  }
  
  .share-icon.copy {
    background-color: var(--text-secondary);
  }
  
  .share-option span {
    font-size: 0.85rem;
    color: var(--text-primary);
  }
  
  .share-link-container {
    display: flex;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
  }
  
  .share-link-input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background-color: var(--background-light);
    color: var(--text-primary);
    font-size: 0.9rem;
  }
  
  .copy-btn {
    padding: 0 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
  }
  
  .options-list {
    display: flex;
    flex-direction: column;
  }
  
  .option-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: none;
    border: none;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
    font-size: 0.95rem;
    text-align: left;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .option-item:last-child {
    border-bottom: none;
  }
  
  .option-item:hover {
    background-color: var(--background-light);
  }
  
  /* Gallery modal */
  .gallery-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: white;
  }
  
  .gallery-counter {
    font-size: 0.9rem;
  }
  
  .gallery-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .gallery-image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .gallery-full-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }
  
  .gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
  }
  
  .gallery-nav.prev {
    left: 1rem;
  }
  
  .gallery-nav.next {
    right: 1rem;
  }
  
  .gallery-caption {
    color: white;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
  }
  
  /* Toast message */
  .toast-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    animation: slideUp 0.3s ease;
  }
  
  .toast-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    border-left: 4px solid var(--success-color);
  }
  
  .toast-content svg {
    color: var(--success-color);
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Responsive adjustments */
  @media (min-width: 768px) {
    .post-title {
      font-size: 1.75rem;
    }
    
    .gallery-container {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .related-posts-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    
    .related-post-item {
      flex-direction: column;
    }
    
    .related-post-image {
      width: 100%;
      height: 100px;
    }
  }
  
  @media (max-width: 480px) {
    .post-title {
      font-size: 1.35rem;
    }
    
    .share-options {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    .action-group {
      gap: 1rem;
    }
  }
  </style>