package com.example.backend.controller

import com.example.backend.dto.PostDto
import com.example.backend.service.PostService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = ["http://localhost:3000"])
class PostController(
    private val postService: PostService
) {
    
    @GetMapping
    fun getPosts(@PageableDefault(size = 10) pageable: Pageable): ResponseEntity<Page<PostDto.ListResponse>> =
        ResponseEntity.ok(postService.getPosts(pageable))
    
    @GetMapping("/{id}")
    fun getPost(@PathVariable id: Long): ResponseEntity<PostDto.Response> =
        ResponseEntity.ok(postService.getPost(id))
    
    @PostMapping
    fun createPost(@RequestBody request: PostDto.Request): ResponseEntity<PostDto.Response> =
        ResponseEntity.ok(postService.createPost(request))
    
    @PutMapping("/{id}")
    fun updatePost(
        @PathVariable id: Long,
        @RequestBody request: PostDto.Request
    ): ResponseEntity<PostDto.Response> =
        ResponseEntity.ok(postService.updatePost(id, request))
    
    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: Long): ResponseEntity<Unit> =
        ResponseEntity.ok(postService.deletePost(id))
    
    @PostMapping("/{id}/like")
    fun likePost(@PathVariable id: Long): ResponseEntity<Unit> =
        ResponseEntity.ok(postService.incrementLikes(id))
} 