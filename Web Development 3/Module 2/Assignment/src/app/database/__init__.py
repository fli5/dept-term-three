#!/usr/bin/env python
# -*- coding: utf-8 -*-
#  ---------------------------------------------------------------------
#  Copyright (c) 2025. Felix Li. All rights reserved
#  Unauthorized copying, modification, or distribution of this file, via any
#  medium, is strictly prohibited without prior written permission from Felix Li.
#  For licensing inquiries, please contact: fli5@academic.rrc.ca
#  ---------------------------------------------------------------------

# ---------------------------------------------------------------------
# Program: Full Stack Web Development
# Author: Feng Li
# Course: WEBD-3010 (273793) Web Development 3
# Created: 2025-09-24
# ---------------------------------------------------------------------
from pathlib import Path

PACKAGE_DIR = Path(__file__).parent
SQL_DIR = PACKAGE_DIR / "sql"

def get_sql_file(file_name: str) -> Path:
    return SQL_DIR / file_name

SCHEMA_SQL_FILE = get_sql_file("create_tables.sql")
DATA_SQL_FILE = get_sql_file("initial_data.sql")
