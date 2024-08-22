package com.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetRequest {
    private String email;
    private String otp;
    private String newPassword;

    
}

