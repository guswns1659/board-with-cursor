package com.example.backend.controller;

import com.example.backend.dto.PostDto;
import com.example.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    
    private final PostService postService;
    
    @GetMapping
    public ResponseEntity<Page<PostDto.ListResponse>> getPosts(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(postService.getPosts(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PostDto.Response> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));
    }
    
    @PostMapping
    public ResponseEntity<PostDto.Response> createPost(@RequestBody PostDto.Request request) {
        return ResponseEntity.ok(postService.createPost(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PostDto.Response> updatePost(
            @PathVariable Long id,
            @RequestBody PostDto.Request request) {
        return ResponseEntity.ok(postService.updatePost(id, request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likePost(@PathVariable Long id) {
        postService.incrementLikes(id);
        return ResponseEntity.ok().build();
    }
} 