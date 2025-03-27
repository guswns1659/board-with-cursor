package com.example.backend.dto

import java.time.LocalDateTime

object PostDto {
    data class Request(
        var title: String,
        var content: String,
        var author: String
    )

    data class Response(
        var id: Long,
        var title: String,
        var content: String,
        var author: String,
        var likesCount: Int,
        var commentsCount: Int,
        var createdAt: LocalDateTime,
        var updatedAt: LocalDateTime
    )

    data class ListResponse(
        var id: Long,
        var title: String,
        var content: String,
        var author: String,
        var likesCount: Int,
        var commentsCount: Int,
        var createdAt: LocalDateTime
    )
} 