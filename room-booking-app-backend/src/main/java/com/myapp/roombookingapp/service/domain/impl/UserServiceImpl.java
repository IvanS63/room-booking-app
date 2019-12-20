package com.myapp.roombookingapp.service.domain.impl;

import com.myapp.roombookingapp.dao.UserDao;
import com.myapp.roombookingapp.entity.User;
import com.myapp.roombookingapp.service.domain.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * UserServiceimpl.
 *
 * @author Ivan_Semenov
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDAO;

    @Override
    @Transactional
    public void add(User user) {
        userDAO.add(user);
    }

    @Override
    @Transactional
    public void edit(User user) {
        userDAO.edit(user);
    }

    @Override
    @Transactional
    public void remove(Integer id) {
        userDAO.remove(userDAO.findById(id));
    }

    @Override
    @Transactional
    public List<User> getAll() {
        return userDAO.getAll();
    }

    @Override
    @Transactional
    public User findById(Integer id) {
        return userDAO.findById(id);
    }

    @Override
    @Transactional
    public User findByLogin(String login) {
        return userDAO.findByLogin(login);
    }
}
