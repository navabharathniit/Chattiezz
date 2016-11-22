package com.chattiez.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chattiez.dao.BlogDao;
import com.chattiez.dao.JobsDao;
import com.chattiez.dao.UsersDao;
import com.chattiez.model.Blog;
import com.chattiez.model.Jobs;
import com.chattiez.model.Users;
@RestController
public class UserController {
	@Autowired
	UsersDao usersdao;
	
	@Autowired
	BlogDao blogdao;
	
	@Autowired
	JobsDao jobsdao;
	@RequestMapping(value="/registerUser",headers="accept=Application/json",method=RequestMethod.POST)
	public void saveUser(@RequestBody Users user)
	{
		usersdao.registerUser(user);

}
	@RequestMapping(value="/createBlog",headers="accept=Application/json",method=RequestMethod.POST)
	public void saveBlog(@RequestBody Blog blog)
	{
		blogdao.createBlog(blog);
	}
	
	@RequestMapping(value="/addJobs",headers="accept=Application/json",method=RequestMethod.POST)
	public void saveJobs(@RequestBody Jobs jobs)
	{
		jobsdao.addJobs(jobs);

	}

	@RequestMapping(value="/getUsers",headers="accept=Application/json",method=RequestMethod.GET)
	public List <Users> getUsers()
	{
		List<Users> users=usersdao.listUsers();
return users;
}
	
	@RequestMapping(value="/getBlogs",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Blog> getBlogs()
	{
		List<Blog> blogs=blogdao.viewBlogs();
		return blogs;
	}
	
	@RequestMapping(value="/getJobs",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Jobs> getJobs()
	{
		List<Jobs> jobs=jobsdao.viewJobs();
		return jobs;
	}
	
	@RequestMapping(value="/deleteJob/{id}",headers="accept=Application/json",method=RequestMethod.DELETE)
	public void deleteJob(@PathVariable int id){
		jobsdao.deleteJob(id);
	}
	
	
	@RequestMapping(value="/authenticate", method=RequestMethod.POST,headers="Accept=application/json")
	 public int authenticateUser(@RequestBody Users users)
	 {
		 System.out.println("email:"+users.getEmail());
		 System.out.println("password:"+users.getPassword());
	int result=0;
		 result=usersdao.validateUser(users.getEmail(),users.getPassword());
		 System.out.println("result we have got is:"+result);
		 return result;
	 }

	}
