package com.capstone.sportsmate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://15.164.164.248:3000", "http://15.164.164.248:8080"
                       ,"http://sportsmate.tk:3000","http://sportsmate.tk","https://sportsmate.tk" )
                .allowedHeaders("*")
                .allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE", "HEAD")
                .allowCredentials(true)
                .exposedHeaders("Authorization");

    }
}