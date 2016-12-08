package com.chattiez.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
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
	
	public List<Blog> viewMyBlogs(String posted_By) {
		System.out.println("Inside the  viewMyBlogs(String posted_By)");
		Session session=sessionfactory.getCurrentSession();
		Criteria crit=session.createCriteria(Blog.class);
		crit.add(Restrictions.eq("posted_By",posted_By));
		crit.add(Restrictions.eq("status",true));
		List list=crit.list();
		System.out.println("list:"+list);
		return list;
	}
	
	public List<Blog> viewBlogs() {
		Session session=sessionfactory.getCurrentSession();
		List<Blog> list=session.createCriteria(Blog.class).list();
		return list;
	}
	public void updateBlogs(Blog blog) {
		sessionfactory.getCurrentSession().update(blog);
		
	}
	public void deleteBlog(Blog blog) {
		sessionfactory.getCurrentSession().delete(blog);
		
	}
	
}
