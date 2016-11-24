package com.chattiez.dao;

import java.util.List;



import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.chattiez.model.Users;

@Transactional
@Repository
public class UsersDaoImpl implements UsersDao {
	@Autowired
	SessionFactory sessionfactory;
	public void registerUser(Users user) {
		
		sessionfactory.getCurrentSession().save(user);
	}


public List<Users> listUsers(){
	Session session=sessionfactory.getCurrentSession();
	List<Users> list=session.createCriteria(Users.class).list();
	return list;
}

public int validateUser(String email,String password){
	int res=0;
	
	Session session=sessionfactory.getCurrentSession();
	Query result=session.createQuery("from Users u where u.email='"+email+"'");
	List<Users> users=result.list();
	System.out.println("user:"+users);
	if(users.size()==0){
		res=0;
	}
	else
	{
	for(int i=0;i<users.size();i++)
	{
		System.out.println("inside for loop");
		String dbuserName=users.get(i).getEmail();
		String dbpassword=users.get(i).getPassword();
		String dbrole=users.get(i).getRole();
		if(dbuserName.equals(email)&&dbpassword.equals(password)&&dbrole.equals("ROLE_USER"))
		{
			res=1;
			System.out.println("result is:"+res);
		}
		else
			if(dbuserName.equals(email)&&dbpassword.equals(password)&&dbrole.equals("ROLE_ADMIN"))
		{
			res=2;
			System.out.println("the result  is:"+res);
		}
	}
	}
	return res;
}
}
	

