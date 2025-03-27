package com.example.backend.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    var title: String,

    @Column(nullable = false, length = 5000)
    var content: String,

    @Column(nullable = false)
    var author: String,

    @Column(name = "likes_count", columnDefinition = "INTEGER DEFAULT 0")
    var likesCount: Int = 0,

    @Column(name = "comments_count", columnDefinition = "INTEGER DEFAULT 0")
    var commentsCount: Int = 0,

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @UpdateTimestamp
    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    constructor() : this(
        title = "",
        content = "",
        author = "",
        likesCount = 0,
        commentsCount = 0
    )
} 