package com.chattiez.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chattiez.model.Jobs;
@Transactional
@Repository
public class JobsDaoImpl implements JobsDao{
	@Autowired
	SessionFactory sessionfactory;
	public void addJobs(Jobs jobs) {
			sessionfactory.getCurrentSession().save(jobs);
		
	}
	public List<Jobs> viewJobs() {
	Session session=sessionfactory.getCurrentSession();
	List<Jobs> list=session.createCriteria(Jobs.class).list();
		return list;
	}
	public void updateJobs(Jobs jobs) {
	sessionfactory.getCurrentSession().update(jobs);;
		
		
	}
	public void deleteJob(Jobs jobs) {
		sessionfactory.getCurrentSession().delete(jobs);
	
	}
	
	
	
	
}
