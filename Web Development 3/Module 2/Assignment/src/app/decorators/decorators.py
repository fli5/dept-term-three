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

import sqlite3
from functools import wraps


def execute_sql(query: str):
    """
    Decorator: Safely execute SQL statements, support parameterization, and automatic transaction management.
    :param query: SQLA query statement can contain `?` placeholders.

    Example:
        @execute_sql("UPDATE Products SET price = ? WHERE product_id = ?")
        def update_product(self, new_price: float, product_id: int):
            print(f"Updated product {product_id} price to {new_price}")
    """

    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            try:
                with self._db_conn:
                    print(f"[Execute SQL] Query: {query} | Params: {args}")
                    self._conn_cursor.execute(query, args)
                return func(self, *args, **kwargs)
            except sqlite3.Error as e:
                print(f"[SQL ERROR] {e} | Query: {query} | Params: {args}")
                raise

        return wrapper

    return decorator


def log_execution(func):
    """
    Decorator to log method calls.
    :param func: Function to decorate.
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        print('*' * 80)
        print(f"[LOG] Running {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"[LOG] Finished {func.__name__}")
        print('*' * 80)
        return result

    return wrapper
