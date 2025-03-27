package com.example.backend.service

import com.example.backend.dto.PostDto
import com.example.backend.entity.Post
import com.example.backend.repository.PostRepository
import jakarta.persistence.EntityNotFoundException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class PostService(
    private val postRepository: PostRepository
) {
    
    fun getPosts(pageable: Pageable): Page<PostDto.ListResponse> =
        postRepository.findAll(pageable).map { post ->
            PostDto.ListResponse(
                id = post.id,
                title = post.title,
                content = post.content,
                author = post.author,
                likesCount = post.likesCount,
                commentsCount = post.commentsCount,
                createdAt = post.createdAt
            )
        }
    
    fun getPost(id: Long): PostDto.Response =
        postRepository.findById(id)
            .map { post ->
                PostDto.Response(
                    id = post.id,
                    title = post.title,
                    content = post.content,
                    author = post.author,
                    likesCount = post.likesCount,
                    commentsCount = post.commentsCount,
                    createdAt = post.createdAt,
                    updatedAt = post.updatedAt
                )
            }
            .orElseThrow { EntityNotFoundException("Post not found with id: $id") }
    
    @Transactional
    fun createPost(request: PostDto.Request): PostDto.Response {
        val post = Post(
            title = request.title,
            content = request.content,
            author = request.author
        )
        
        return postRepository.save(post).let { savedPost ->
            PostDto.Response(
                id = savedPost.id,
                title = savedPost.title,
                content = savedPost.content,
                author = savedPost.author,
                likesCount = savedPost.likesCount,
                commentsCount = savedPost.commentsCount,
                createdAt = savedPost.createdAt,
                updatedAt = savedPost.updatedAt
            )
        }
    }
    
    @Transactional
    fun updatePost(id: Long, request: PostDto.Request): PostDto.Response {
        val post = postRepository.findById(id)
            .orElseThrow { EntityNotFoundException("Post not found with id: $id") }
        
        post.apply {
            title = request.title
            content = request.content
            author = request.author
        }
        
        return postRepository.save(post).let { updatedPost ->
            PostDto.Response(
                id = updatedPost.id,
                title = updatedPost.title,
                content = updatedPost.content,
                author = updatedPost.author,
                likesCount = updatedPost.likesCount,
                commentsCount = updatedPost.commentsCount,
                createdAt = updatedPost.createdAt,
                updatedAt = updatedPost.updatedAt
            )
        }
    }
    
    @Transactional
    fun deletePost(id: Long) {
        if (!postRepository.existsById(id)) {
            throw EntityNotFoundException("Post not found with id: $id")
        }
        postRepository.deleteById(id)
    }
    
    @Transactional
    fun incrementLikes(id: Long) {
        val post = postRepository.findById(id)
            .orElseThrow { EntityNotFoundException("Post not found with id: $id") }
        post.likesCount++
        postRepository.save(post)
    }
} 