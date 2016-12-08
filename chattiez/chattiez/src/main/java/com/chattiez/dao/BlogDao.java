package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Blog;
import com.chattiez.model.Jobs;

public interface BlogDao {
	void createBlog(Blog blog);
List<Blog> viewBlogs();
List<Blog> viewMyBlogs(String posted_By);
void updateBlogs(Blog blog);
void deleteBlog(Blog blog);
}
