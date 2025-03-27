package com.example.backend.service;

import com.example.backend.dto.PostDto;
import com.example.backend.entity.Post;
import com.example.backend.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    
    private final PostRepository postRepository;
    
    public Page<PostDto.ListResponse> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable)
                .map(post -> {
                    PostDto.ListResponse response = new PostDto.ListResponse();
                    BeanUtils.copyProperties(post, response);
                    return response;
                });
    }
    
    public PostDto.Response getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
        
        PostDto.Response response = new PostDto.Response();
        BeanUtils.copyProperties(post, response);
        return response;
    }
    
    @Transactional
    public PostDto.Response createPost(PostDto.Request request) {
        Post post = new Post();
        BeanUtils.copyProperties(request, post);
        
        post = postRepository.save(post);
        
        PostDto.Response response = new PostDto.Response();
        BeanUtils.copyProperties(post, response);
        return response;
    }
    
    @Transactional
    public PostDto.Response updatePost(Long id, PostDto.Request request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
        
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(request.getAuthor());
        
        post = postRepository.save(post);
        
        PostDto.Response response = new PostDto.Response();
        BeanUtils.copyProperties(post, response);
        return response;
    }
    
    @Transactional
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new EntityNotFoundException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }
    
    @Transactional
    public void incrementLikes(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
        post.setLikesCount(post.getLikesCount() + 1);
        postRepository.save(post);
    }
} 