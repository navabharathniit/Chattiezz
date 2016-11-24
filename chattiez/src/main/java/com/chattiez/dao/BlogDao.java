package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Blog;

public interface BlogDao {
	void createBlog(Blog blog);
List<Blog> viewBlogs();
}
