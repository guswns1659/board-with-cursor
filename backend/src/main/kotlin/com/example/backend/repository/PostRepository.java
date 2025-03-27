package com.example.backend.repository;

import com.example.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공됨
} 