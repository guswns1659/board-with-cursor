package com.example.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

public class PostDto {
    
    @Data
    public static class Request {
        private String title;
        private String content;
        private String author;
    }
    
    @Data
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private String author;
        private int likesCount;
        private int commentsCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
    
    @Data
    public static class ListResponse {
        private Long id;
        private String title;
        private String content;
        private String author;
        private int likesCount;
        private int commentsCount;
        private LocalDateTime createdAt;
    }
} 