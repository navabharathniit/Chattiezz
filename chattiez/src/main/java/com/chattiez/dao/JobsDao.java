package com.chattiez.dao;

import java.util.List;

import com.chattiez.model.Jobs;

public interface JobsDao {
void addJobs(Jobs jobs);
	List<Jobs> viewJobs();
	void updateJobs(Jobs jobs);
void deleteJob(Jobs jobs);
}
