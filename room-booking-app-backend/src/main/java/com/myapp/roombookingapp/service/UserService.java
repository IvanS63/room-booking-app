package com.myapp.roombookingapp.service;

import com.myapp.roombookingapp.entity.User;

import java.util.List;

/**
 * UserService.
 *
 * @author Ivan_Semenov
 */
public interface UserService {

    void add(User user);

    void edit(User user);

    void remove(User user);

    List<User> getAll();

    User findById(Integer id);

    User findByLogin(String login);
}
