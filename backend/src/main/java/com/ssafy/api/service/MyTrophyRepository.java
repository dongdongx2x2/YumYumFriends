package com.ssafy.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.MyTrophy;

@Repository
public interface MyTrophyRepository extends JpaRepository<MyTrophy, Integer> {
	
	void deleteByUserID(int userID);

	List<MyTrophy> findAllByUserID(int userID);

}