#!/usr/bin/env python
# -*- coding: utf-8 -*-


# tests/test_consumer_pact.py
from pact import Pact
from pact_ffi import Consumer, Provider
import requests

PACT_DIR = "../pacts"
pact = Pact("consumer", "provider")


def test_get_user():
    """
    Test the /user/<id> endpoint of the provider.
    """
    user_id = "123"
    expected_response = {"username": "testuser", "email": "testuser@example.com"}
    # Define the expected interaction with the provider
    (
        pact.upon_receiving("a basic request")
        .given(f"user {user_id} exists")
        .with_request("GET", f"/user/{user_id}")
        .will_respond_with(200)
        .with_body(expected_response)
    )

    # Start the mock server and run the test
    with pact.serve() as srv:
        expected_api = f"{srv.url}/user/{user_id}"
        response = requests.get(expected_api)
        response.raise_for_status()
        actual_result = response.json()
        assert actual_result == expected_response

    pact.write_file(PACT_DIR)
