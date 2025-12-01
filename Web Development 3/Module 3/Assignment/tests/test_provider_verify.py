#!/usr/bin/env python
# -*- coding: utf-8 -*-

# tests/test_provider_verify.py
from pact import Verifier
import pytest

# Path to the directory containing the pact files
PACT_DIR = "../pacts"
# The actual URL where the provider service is running
ACTUAL_URL = "http://localhost:5000"


def test_provider_pact():
    """
    Verify the provider against the pact files.
    """
    verifier = (
        Verifier("provider")
        .add_source(f"{PACT_DIR}/")
        .add_transport(url=f"{ACTUAL_URL}")
    )

    verifier.verify()
