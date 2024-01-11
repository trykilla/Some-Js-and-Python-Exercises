#!/usr/bin/env python3

# Qué códigos ignorar para pylint
# pylint: disable=missing-module-docstring
# pylint: disable=unused-argument
# pylint: disable=redefined-outer-name
# pylint: disable=trailing-whitespace
# pylint: disable=consider-using-f-string

from time import time, sleep
from itertools import product
from multiprocessing import Pool, Manager
import string
import signal
import sys
import os


PASSWORD = "mipa"
LETTERS = string.ascii_lowercase
PASSWORD_LENGTH = 9


def finnish(signum, frame):
    """_summary_

    Args:
        signum (_type_): _description_
        frame (_type_): _description_
    """
    print("🛑 Ctrl + C has been detected, exiting...")
    sleep(0.5)
    print(f"🏁 Exiting process number: {os.getpid()}")
    pool.terminate()
    sys.exit(0)


def attempt_decryption(passphrase, password_found, attemp_count, start_time):
    """Tries to decrypt the file with the next passphrase

    Args:
        passphrase (_type_): The actual passphrase to try
        password_found (_type_): A shared variable to indicate if the password has been found
        encrypted_data (_type_): The encrypted data to decrypt
        start_time (_type_): The time when the program started
    """
   
    if password_found.value:
        return
    
    print(f"Trying: {passphrase}")
    attemp_count.value += 1
    
    if passphrase == PASSWORD:
        password_found.value = 1
        print(f"Password cracked in {attemp_count.value} attempts. The password is: {passphrase}")
        end_time = time()

        print("Time elapsed: {:.2f} seconds".format(end_time - start_time))


def map_attempt_decryption(data):
    """Maps the attempt_decryption function to the data and tries to decrypt the file in a foor_loop

    Args:
        data (_type_): The list of passphrases to try and the start time
    """
    passphrases, start_time, attemp_count = data
    for passphrase in passphrases:
        attempt_decryption(passphrase, password_found,
                           attemp_count,start_time)


if __name__ == "__main__":

    # First we get the file to decrypt and the number of processes to use,

    num_processes = int(input("Enter the number of processes to use: "))

    signal.signal(signal.SIGINT, finnish)

    with Manager() as manager:
        # Shared variable to indicate if the password has been found
        password_found = manager.Value('i', 0)
        attemp_count = manager.Value('i', 0)

        # From where length to start and where to finish
        for password_length in range(1, PASSWORD_LENGTH):

            if password_found.value:
                print("Password found, exiting...")
                break

            # Create a list of combinations with "product" function
            args = [''.join(passw) for passw in (
                product(LETTERS, repeat=password_length))]

            chunk_size = len(args) // num_processes
            chunks = [args[i:i + chunk_size]
                      for i in range(0, len(args), chunk_size)]  # Divide the list in chunks and assign them to a process (We create a list of lists)

            with Pool(processes=num_processes) as pool:  # Create the pool of processes
                print(f"Starting the crack with {num_processes} processes")

                start_time = time()

                # Map functiono to the pool of processes
                pool.map(map_attempt_decryption, [
                         (chunk, start_time, attemp_count) for chunk in chunks])
                pool.close()
                pool.join()
