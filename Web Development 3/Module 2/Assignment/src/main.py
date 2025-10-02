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

from app.database.sqlite_conn import SQLiteConn
from app.database.table_enum import TableEnum

def print_step(step_no: int, description: str):
    print(f"\n▶️{step_no}. {description}")


def print_success(message: str):
    print(f"✅ {message}")


def display_tables(db, tables, conditions=None):
    for table in tables:
        db.read_datas(table, conditions.get(table) if conditions else None)


if __name__ == '__main__':
    db_dir = Path(__file__).resolve().parent.parent / 'sqlite'
    with SQLiteConn(db_dir) as sqlite_conn:
        # Create Tables
        print_step(1,
                   f"Creating tables: {TableEnum.TABLE_CUSTOMERS.value}, {TableEnum.TABLE_PRODUCTS.value}, {TableEnum.TABLE_ORDERS.value}")
        sqlite_conn.create_tables()
        print_success("Created tables successfully")

        # Initialize Tables
        print_step(2,
                   f"Initializing tables: {TableEnum.TABLE_CUSTOMERS.value}, {TableEnum.TABLE_PRODUCTS.value}, {TableEnum.TABLE_ORDERS.value}")
        sqlite_conn.init_tables()
        print_success("Initialized tables successfully")

        # Loading Tables
        print_step(3, "Loading table data")
        display_tables(sqlite_conn, [
            TableEnum.TABLE_ORDERS,
            TableEnum.TABLE_PRODUCTS,
            TableEnum.TABLE_CUSTOMERS
        ])
        print_success("Loaded tables data successfully")

        # Update a Product
        product_id = 2
        new_price = 0.99
        print_step(4, f"Updating product {product_id} price to {new_price}")
        sqlite_conn.read_datas(TableEnum.TABLE_PRODUCTS, {'product_id': product_id})
        sqlite_conn.update_product(new_price, product_id)
        sqlite_conn.read_datas(TableEnum.TABLE_PRODUCTS, {'product_id': product_id})
        print_success("updated Product price successfully")

        # Delete a Customer
        customer_id = 3
        print_step(5, f"Deleting customer {customer_id}")
        sqlite_conn.read_datas(TableEnum.TABLE_CUSTOMERS)
        sqlite_conn.delete_customer(customer_id)
        sqlite_conn.read_datas(TableEnum.TABLE_CUSTOMERS)
        print_success("Deleted customer successfully")
