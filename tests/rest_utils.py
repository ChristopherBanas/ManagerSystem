"""
Desc: Methods used to test the database
Author: RIT Software Engineering Department (Swen344 taught by Kal Rabb)
"""

import requests


def get_rest_call(test, url, params={}, get_header={}, expected_code=200):
    """
    Used to call on the get rest classes in server
    :param test: Self
    :param url: Get url
    :param params: Json dictionary used for params
    :param get_header: Dictionary header
    :param expected_code: Expected URL code
    :return: Response from server
    """
    response = requests.get(url, params, headers=get_header)
    test.assertEqual(expected_code, response.status_code,
                     f'Response code to {url} not {expected_code}')
    return response.json()


def post_rest_call(test, url, params={}, post_header={}, expected_code=200):
    """
    Used to post on the get rest classes in server
    :param test: Self
    :param url: Get url
    :param params: Json dictionary used for params
    :param post_header: Dictionary header
    :param expected_code: Expected URL code
    :return: Response from server
    """
    response = requests.post(url, params, headers=post_header)
    test.assertEqual(expected_code, response.status_code,
                     f'Response code to {url} not {expected_code}')
    return response.json()


def put_rest_call(test, url, params={}, put_header={}, expected_code=200):
    """
    Used to call on the put rest classes in server
    :param test: Self
    :param url: Get url
    :param params: Json dictionary used for params
    :param put_header: Dictionary header
    :param expected_code: Expected URL code
    :return: Response from server
    """
    response = requests.put(url, params, headers=put_header)
    test.assertEqual(expected_code, response.status_code,
                     f'Response code to {url} not {expected_code}')
    return response.json()


def delete_rest_call(test, url, expected_code=200):
    """
    Used to call on the put rest classes in server
    :param test: Self
    :param url: Get url
    :param expected_code: Expected URL code
    :return: Response from server
    """
    response = requests.delete(url)
    test.assertEqual(expected_code, response.status_code,
                     f'Response code to {url} not {expected_code}')
    return response.json()
