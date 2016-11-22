package com.chattiez.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chattiez.model.Blog;
@Transactional
@Repository
public class BlogDaoImpl implements BlogDao {
	@Autowired
	SessionFactory sessionfactory;
	public void createBlog(Blog blog) {
		sessionfactory.getCurrentSession().save(blog);
		
	}
	public List<Blog> viewBlogs() {
		Session session=sessionfactory.getCurrentSession();
		List<Blog> list=session.createCriteria(Blog.class).list();
		return list;
	}
	
}
