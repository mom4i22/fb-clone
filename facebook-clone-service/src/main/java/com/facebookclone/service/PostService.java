package com.facebookclone.service;

import com.facebookclone.model.Post;

import java.util.List;

public interface PostService {
    Post addPost(Post post) throws Exception;

    List<Post> getAllPosts();
}
