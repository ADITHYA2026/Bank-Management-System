package com.bank.management.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "employees")
public class Employee {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private String employeeCode;
    public Employee() {
    }
    public Employee(String id, String name, String email,
                    String phone, String employeeCode) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.employeeCode = employeeCode;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmployeeCode() {
        return employeeCode;
    }
    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }
}