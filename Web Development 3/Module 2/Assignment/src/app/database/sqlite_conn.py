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
import uuid
from pathlib import Path
from typing import Optional, Any, Dict

from app.database import SCHEMA_SQL_FILE, DATA_SQL_FILE
from app.database.table_enum import TableEnum
from app.decorators.decorators import execute_sql, log_execution


class SQLiteConn:
    """
     SQLiteConn manages SQLite database connections and operations.

     Attributes:
         _db_name (str): Name of the SQLite database file.
         _db_conn (sqlite3.Connection): Connection object.
         _conn_cursor (sqlite3.Cursor): Cursor object.
     """

    # Apply decorator to log the execute logs
    @log_execution
    def __init__(self, db_dir: Path):
        self._db_dir = db_dir
        self._db_dir.mkdir(parents=True, exist_ok=True)

        # Generate random database names (prevent overwriting existing databases)
        self._db_name = self._db_dir / f"{uuid.uuid4().hex[:8]}.db"
        self._db_conn = sqlite3.connect(self._db_name)
        self._conn_cursor = self._db_conn.cursor()
        print(f"Database created: {self._db_name}")

    def __enter__(self):
        """
        A part of context management protocol, which works with the with statement.
        :return: SQLiteConn
        """
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """
        A part of context management protocol, which works with the with statement.
        :return: None
        """
        try:
            self._conn_cursor.close()
            self._db_conn.close()
            print("Database connection closed automatically.")
        except Exception as e:
            print(f"Error closing database: {e}")

    @property
    def db_name(self) -> str:
        """
        This property returns the database name as a string.
        :return: The database name as a string.
        """
        return str(self._db_name)

    # Apply decorator to restrict the read-only attribute
    @property
    def db_conn(self) -> sqlite3.Connection:
        """
        This property returns the database connection object.
        :return: The database connection object.
        """
        return self._db_conn

    # Apply decorator to restrict the read-only attribute
    @property
    def conn_cursor(self) -> sqlite3.Cursor:
        """
        This property returns the database cursor object.
        :return: The database cursor object.
        """
        return self._conn_cursor

    # Apply decorator to log the execute logs
    @log_execution
    def _load_sql_file(self, sql_file: Path) -> None:
        """
        Load and execute sql from a file
        :param sql_file: The path to the sql file.
        :return: None
        """
        if not isinstance(sql_file, Path):
            raise TypeError("sql_file must be Path")

        if not sql_file.exists():
            raise FileNotFoundError(f"{sql_file} not found")

        sql_script = sql_file.read_text(encoding="utf-8")
        try:
            with self._db_conn:
                self._db_conn.executescript(sql_script)
            print(f"Executed SQL file: {sql_file}")
        except sqlite3.Error as e:
            print(f"SQL execution failed: {e}")
            raise

    # Apply decorator to log the execute logs
    @log_execution
    def create_tables(self) -> None:
        """
        Create tables by executing sql
        :return: None
        """
        self._load_sql_file(SCHEMA_SQL_FILE)

    # Apply decorator to log the execute logs
    @log_execution
    def init_tables(self) -> None:
        """
        Initialize tables by executing sql
        :return: None
        """
        self._load_sql_file(DATA_SQL_FILE)

    @log_execution
    def read_datas(self, table_name: TableEnum, where_condition: Optional[Dict[str, Any]] = None,
                   limit_size: Optional[int] = None) -> None:
        """
        Read data from a table with optional filtering conditions.
        :param table_name: The table name.
        :param where_condition: The condition dictionary.
        :param limit_size: The number of rows to read.
        :return: None
        Example:
            db.read_datas("Customers", {"customer_id": 1})
        """
        # -------------------------------------------
        # Use parametrized SQL to avoid SQL injection
        # -------------------------------------------
        query_sql = f"SELECT * FROM {table_name.value}"
        query_params = []
        if where_condition:
            where_clause = [f"{field_name} = ?" for field_name in where_condition.keys()]
            query_sql += " WHERE " + " AND ".join(where_clause)
            query_params.extend(where_condition.values())

        if limit_size and isinstance(limit_size, int):
            query_sql += " LIMIT ?"
            query_params.append(limit_size)

        try:
            print(f"{table_name.value}".center(80, "-"))
            self._conn_cursor.execute(query_sql, query_params)
            query_result = self._conn_cursor.execute(query_sql, query_params).fetchall()
            for row in query_result:
                print(row)
            print("-" * 80)
        except sqlite3.Error as e:
            print(f"Query failed: {e}")

    @log_execution
    # Bind SQL to a method using decorator
    @execute_sql("UPDATE Products SET price = ? WHERE product_id = ?")
    def update_product(self, new_price: float, product_id: int) -> None:
        """
        Update the price of a product.
        :param new_price: The new price.
        :param product_id: The id of the product.
        :return: None
        """
        print(f"Updated product {product_id} price to {new_price}")

    @log_execution
    # Bind SQL to a method using decorator
    @execute_sql("DELETE FROM Customers WHERE customer_id = ?")
    def delete_customer(self, customer_id: int) -> None:
        """
        Delete a customer.
        :param customer_id: The id of the customer.
        :return: None
        """
        print(f"Deleted customer {customer_id}")

    @log_execution
    def close(self) -> None:
        """
        Close the database connection.
        :return: None
        """
        try:
            self._db_conn.close()
            print("\nDatabase connection closed.")
        except sqlite3.Error as e:
            print(f"Failed to close database: {e}")
