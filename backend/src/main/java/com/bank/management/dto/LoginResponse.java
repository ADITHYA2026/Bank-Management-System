package com.bank.management.dto;
public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private String employeeId;
    public LoginResponse() {
    }
    public LoginResponse(String token, String username, String role, String employeeId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.employeeId = employeeId;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}