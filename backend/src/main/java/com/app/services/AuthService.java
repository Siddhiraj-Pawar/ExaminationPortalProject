package com.app.services;

import com.app.models.LoginRequest;
import com.app.models.LoginResponse;
import com.app.models.User;

public interface AuthService {
    User registerUserService(User user) throws Exception;

    LoginResponse loginUserService(LoginRequest loginRequest) throws Exception;
}
