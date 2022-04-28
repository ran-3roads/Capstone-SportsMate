package com.capstone.sportsmate.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {

    @Id
    @Column(name = "rt_key")
    private String key;

    @Column(name = "rt_value")
    private String value;

    @Column(name = "rt_access_token")
    private String accessToken;

    @Builder
    public RefreshToken(String key, String value, String accessToken) {
        this.key = key;
        this.value = value;
        this.accessToken = accessToken;
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        return this;
    }
    public RefreshToken updateAccessToken(String accessToken){
        this.accessToken = accessToken;
        return this;
    }
}