var chattiez=angular.module('chattiez',['ngRoute']);
    chattiez.config(function($routeProvider)
    		{
    	$routeProvider.when('/register',
    			{
    		templateUrl:"partials/register.html",
    		controller:"registerController"
    			})
    			
    			.when("/blog",
			{
		templateUrl:"partials/blog.html",
		controller:"blogController"
		
	})
	
	.when("/jobs",
			{
		templateUrl:"partials/jobs.html",
		controller:"jobController"
		
	})
    	
    .when("/login",
    		{
    		templateUrl:"partials/login.html",
    		controller:"loginController"
    		})
    		
    .when("/admin",
    {
    		templateUrl:"partials/admin.html",
    			controller:"adminController"
    	}	)	
    		     });
    chattiez.controller('registerController', function($scope,$http)
    		{
    	console.log("i am in register controller");
    	$scope.register=function()
    	{
    		var users={
    				username:$scope.username,
    				password:$scope.password,
    				mobile:$scope.mobile,
    				email:$scope.email
    		};
    		var res=$http.post("http://localhost:8888/chattiez/registerUser",users);
    		res.success(function(data, status, headers,config){
    			console.log("status:"+status);
    	});
    	}
    		});
    
    chattiez.controller("blogController",function($scope,$http)
    		{
    			console.log("in blog controller");
    			$scope.blog=function()
    			{
    				var blog={
    						blog_Name:$scope.blog_Name,
    						blog_Description:$scope.blog_Description
    				};
    var res=$http.post("http://localhost:8888/chattiez/createBlog",blog);
    				res.success(function(data, status, headers, config)
    						{
    					console.log("status:"+status);
    						});
    				}
    		});
    
    chattiez.controller("jobController",function($scope,$http)
    		{
    			console.log("in job controller");
    			$scope.job=function()
    			{
    				var job={
    						job_Role:$scope.job_Role,
    						job_Description:$scope.job_Description
    				};
    var res=$http.post("http://localhost:8888/chattiez/addJobs",job);
    				res.success(function(data, status, headers, config)
    						{
    					console.log("status:"+status);
    						});
    				}
    			
    		});
   chattiez.controller("loginController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)		
		   {
	   console.log("in login controller");
	   $scope.login=function()
	   {
		   var login={
				   email:$scope.email,
				   password:$scope.password   
		   };
		   $http.post('http://localhost:8888/chattiez/authenticate',login).then(function (response) {
				 console.log("result   data:"+response.data);
				 var r=response.data.toString();
				 console.log("response:"+r);
			     
					if(r==1)
						{
						$rootScope.blog=true;						
						$rootScope.jobs=true;
						$rootScope.login=false;
						$rootScope.register=false;
						$rootScope.logout=true;
						$rootScope.chat=true;
						console.log('logout:'+$rootScope.logout);
						console.log("wat is this ya:"+response.data);
						$location.path('/userHome');
						}
					if(r==0)
						{
						$scope.username="";
						$scope.password="";
						$scope.message="username/password incorrect";
						$location.path('/login');
						}
					if(r==2)
					{
						$rootScope.login=false;
						$rootScope.register=false;
						$rootScope.services=false;
						$rootScope.about=false;
						$rootScope.home=false;
						$rootScope.adminBlog=true;
						$rootScope.users=true;
						$rootScope.registeredUsers=true;
						$rootScope.logout=true;
						
					$location.path('/admin');
					}
					
		   });
	   }
		   }]
   );
		   
	  chattiez.controller("adminController",function($scope,$http)
		{
		  $scope="this is admin home";
		}
	  )
	  
	  
	  
	  
	  
	  
	  
	  letzChaat.controller("adminBlogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.services=false;
	$rootScope.about=false;
	$rootScope.home=false;
	$rootScope.adminBlog=true;
	$rootScope.users=true;
	$rootScope.registeredUsers=true;
	$rootScope.logout=true;
	$rootScope.adminJobs=true;
	console.log("i am in adminblog controller");
	console.log("after this");
			 $http.get("http://localhost:8888/chattiez/viewBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			$scope.newBlog={};
			console.log("In Controller");
			$scope.addBlog=function(newBlog)
			{
				var dataObj = {
		    			blogTitle:$scope.blogTitle,
		    			blogDescription:$scope.blogDescription,
		 				category:$scope.category
		 		};
				console.log("title:"+dataObj);
				 var res = $http.post('http://localhost:8888/chattiez/createBlog',dataObj);
				 $http.get("http://localhost:8888/chattiez/viewBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			 		res.success(function(data, status, headers, config) {
			 			$scope.message = data;
			 			console.log("status:"+status);
			 		});
			 		 
			};
			$scope.editBlog=function(blog)
			{
				console.log("inside editblog");
				console.log("blog:"+blog);
				$scope.blogDataToEdit=blog;
			}
			$scope.saveEdit=function()
			{
				var dataObj = {
		    			blogTitle:$scope.blogDataToEdit.blogTitle,
		    			blogDescription:$scope.blogDataToEdit.blogDescription,
		 				category:$scope.blogDataToEdit.category,
		 				blog_id:$scope.blogDataToEdit.blog_id
		 		};
				$http.put('http://localhost:8090/letzchaat/updateBlog', dataObj);
				$http.get("http://localhost:8090/letzchaat/viewBlogs")
		 	    .then(function (response) {$scope.blogs = response.data;});
			}
			$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("delete blog called");
				blog_id:$scope.blogDataToEdit.blog_id;
				console.log("blog_id:"+blogDataToEdit.blog_id);
				$http['delete']('http://localhost:8090/letzchaat/deleteBlog/'+blogDataToEdit.blog_id);
				 $http.get("http://localhost:8090/letzchaat/viewBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			}
			
		}

		);
	  
    		
    		
