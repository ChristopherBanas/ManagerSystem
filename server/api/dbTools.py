"""
Desc: Methods used to execute sql commands
Author: Christopher Banas
"""

import sqlite3


def getOne(sql, args={}):
    """
    Gets one employee from the database given the search query
    :param sql: Sql search string
    :param args: Arguments for the search
    :return: List containing the information for one employee
    """
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()
    result = cur.execute(sql, args).fetchone()
    cur.close()
    return result


def getAll(sql, args={}):
    """
    Gets all employees from the database given the search query
    :param sql: Sql search string
    :param args: Arguments for the search
    :return: List of tuples containing the information for all employee
    """
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()
    result = cur.execute(sql, args).fetchall()
    cur.close()
    return result


def commit(sql, args={}):
    """
    Executes and commits a given sql command
    :param sql: Sql command
    :param args: Arguments for the sql command
    :return: List containing the return information from the execute command
    """
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()
    result = cur.execute(sql, args).fetchall()
    conn.commit()
    conn.close()
    return result
