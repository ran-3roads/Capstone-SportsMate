package com.capstone.sportsmate.domain.status;

public enum ImageCategory {
    PARTY("party/"),MEMBER("member/");
    private final String dir;
    ImageCategory(String dir){
        this.dir = dir;
    }
    public String value(){
        return dir;
    }
}
