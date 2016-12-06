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
    		
    .when("/adminjobs",
    {
    		templateUrl:"partials/adminjobs.html",
    			controller:"adminjobsController"
    	}	)	
    	
    	.when("/userHome",
    			{
    		templateUrl:"partials/userHome.html",
    		controller:"userHomeController"
    			}
    			)
    		     });
    
    
    chattiez.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);

    chattiez.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
        this.uploadFileToUrl = function(file, uploadUrl,email,password,username,mobile){
           var fd = new FormData();
           fd.append('file', file);
           fd.append('email',email);
           fd.append('password',password);
           fd.append('username',username);
           fd.append('mobile',mobile);
        console.log("fd:"+fd)
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
        
           .success(function(){
        	   $scope.message="registered! you can login now!!";
        	    $scope.email="";
        	    $scope.password="";
        	   
           })
        
           .error(function(){
           });
        }
     }]);
    
   
    
    
    chattiez.controller('registerController',['$scope','fileUpload',function($scope,fileUpload){
    	$scope.register=function(){
    		var file=$scope.myFile;
    		var email=$scope.email;
    		var password=$scope.password;
    		var username=$scope.username;
    		var mobile=$scope.mobile;
    		console.log("email"+email);
    		console.log('file is');
    		console.dir(file);
    		var uploadUrl="http://localhost:8888/chattiez/fileUpload";
    		fileUpload.uploadFileToUrl(file,uploadUrl,email,password,username,mobile);
    		
    	};
    }]);
    
    
    
    
    
    
    /*chattiez.controller('registerController', function($scope,$http)
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
    */
    
    /*chattiez.controller("jobController",function($scope,$http)
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
    			
    		});*/
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
						console.log("ename from root scope:"+$rootScope.ename);
						$rootScope.ename=$scope.email;
						console.log("ename:"+$rootScope.email);
						$location.path('/userHome');
						}
					if(r==0)
						{
						$scope.email="";
						$scope.password="";
						$scope.message="email/password incorrect";
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
						
					$location.path('/adminjobs');
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
		  
		  chattiez.controller("userHomeController",function($scope,$http)
			{
			  $scope="this is user home";
			}
			)
   
   
			
			
			
   chattiez.controller("blogController",function($scope,$http)	
			{	
				 $http.get("http://localhost:8888/chattiez/getBlogs").then(function (response) {$scope.blogs = response.data;});
				
				console.log("In Controller");
				$scope.addBlog=function()
				{
					var dataObj = {
			    			blog_Name:$scope.blog_Name,
			    			blog_Description:$scope.blog_Description
			 				
			 		};
					console.log("title:"+dataObj);
					 var res = $http.post("http://localhost:8888/chattiez/createBlog",dataObj);
					 $http.get("http://localhost:8888/chattiez/getBlogs").then(function (response) {$scope.blogs = response.data;});
				 		res.success(function(data, status, headers, config) {
				 			$scope.message = data;
				 			console.log("status:"+status);
				 		});
				}
			
				$scope.editBlog=function(blog)
				{
					console.log("inside updateblog");
					console.log("blog:"+blog);
					$scope.blogDataToEdit=blog;
				}
				$scope.saveEdit=function()
				{
					var dataObj = {
			    			blog_Name:$scope.blogDataToEdit.blogName,
			    			blog_Description:$scope.blogDataToEdit.blogDescription,
			 				blog_Id:$scope.blogDataToEdit.blog_Id
			 		};
					$http.put('http://localhost:8888/chattiez/updateBlog', dataObj);
					$http.get("http://localhost:8888/chattiez/getBlogs")
			 	    .then(function (response) {$scope.blog = response.data;});
				}
				$scope.deleteBlog=function(blogDataToEdit)
				{
					console.log("delete blog called");
					blog_Id:$scope.blogDataToEdit.blog_Id;
					console.log("blog_Id:"+blogDataToEdit.blog_Id);
					$http.post('http://localhost:8888/chattiez/deleteBlog/'+blogDataToEdit.blog_Id);
					 $http.get("http://localhost:8888/chattiez/getBlogs")
				 	    .then(function (response) {$scope.blog = response.data;});
				}
				
			}

			);

   
   
   chattiez.controller("adminjobsController",function($scope,$http,$rootScope)
		   {
	   $http.get("http://localhost:8888/chattiez/getJobs").then(function (response) {$scope.jobs = response.data;});
		
		console.log("In Controller");	   
	   
	   
	   
	   $scope.addjob=function()
		{
			var dataObj={
					job_Role:$scope.job_Role,
					job_Description:$scope.job_Description,
					eligibility:$scope.eligibility
			};
			var res=$http.post("http://localhost:8888/chattiez/addJobs",dataObj);
			$http.get("http://localhost:8888/chattiez/getJobs").then(function (response) {$scope.jobs = response.data;});
			res.success(function(data, status, headers, config) 
			{
				$scope.message = data;
				console.log("status:"+status);
			});
}
	   $scope.updateJobs=function(job)
		{
			console.log("inside updatejob");
			console.log("job:"+job);
			$scope.jobDataToEdit=job;
		}
		$scope.saveEdit=function()
		{
			var dataObj = {
	    			job_Role:$scope.jobDataToEdit.job_Role,
	    			job_Description:$scope.jobDataToEdit.job_Description,
	 				job_Id:$scope.jobDataToEdit.job_Id,
	 				eligibility:$scope.jobDataToEdit.eligibility
	 		};
			$http.put('http://localhost:8888/chattiez/updateJobs', dataObj);
			$http.get("http://localhost:8888/chattiez/getJobs")
	 	    .then(function (response) {$scope.job = response.data;});
		}
		$scope.deleteJob=function(jobDataToEdit)
		{
			console.log("delete job called");
			job_Id:$scope.jobDataToEdit.job_Id;
			console.log("job_Id:"+jobDataToEdit.job_Id);
			$http.post('http://localhost:8888/chattiez/deleteJob/'+jobDataToEdit.job_Id);
			$http.get("http://localhost:8888/chattiez/getJobs")
		 	.then(function (response) {$scope.job = response.data;});
		}
		
	}

	);
	   	 
   
   
   