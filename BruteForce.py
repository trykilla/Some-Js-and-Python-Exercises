#!/usr/bin/env python3

import concurrent.futures
from itertools import product

CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'

def bf_attack(target_pass, password_length, max_attempts=10000000):
    found = False
    numb_of_attemps = 0
    
    while not found and numb_of_attemps < max_attempts:
        combinations = [''.join(passw) for passw in (
            product(CHARACTERS, repeat=password_length))]

        for password in combinations:
            numb_of_attemps += 1
            print(f'Attempt #{numb_of_attemps}')
            if password == target_pass:
                found = True
                print(f'Password cracked in {numb_of_attemps} attempts. The password is {password}')
                break

        password_length += 1
    
    if not found:
        print(f'Password not cracked in {numb_of_attemps} attempts.')

    

if __name__ == '__main__':
    proc_num = 3
    target_pass = 'mipa'
    password_length = 1

    
    with concurrent.futures.ProcessPoolExecutor(max_workers=proc_num) as executor:
        executor.map(bf_attack, [target_pass]*proc_num, [password_length]*proc_num)
