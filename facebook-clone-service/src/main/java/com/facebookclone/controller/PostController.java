package com.facebookclone.controller;

import com.facebookclone.model.Post;
import com.facebookclone.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/post")
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }


    @PostMapping
    public Post addPost(@RequestParam Map<String,String> requestParams) throws Exception {
        String postStr = requestParams.get("post");
        String email = requestParams.get("email");
        String name = requestParams.get("name");
        String profilePic = requestParams.get("profilePic");
        String file = requestParams.get("file");

        Post post = Post.builder()
                .file(file)
                .name(name)
                .email(email)
                .post(postStr)
                .profilePic(profilePic)
                .timeStamp(new Date().toString())
                .build();

        post = postService.addPost(post);
        return post;
    }

    @GetMapping
    public List<Post> getPosts(){
        return postService.getAllPosts();
    }

}
