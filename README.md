# Brute Force Password Cracker

This Python script is a simple brute force password cracker that uses multiprocessing for parallel processing. It attempts to crack a password by trying all possible combinations of lowercase letters (could be change if you want). The script allows you to specify the number of processes to use for the parallelized password cracking.

## Features

- **Parallel Processing**: Utilizes the `multiprocessing` module to distribute the work among some processes.
- **Interrupt Handling**: Captures Ctrl+C interrupts and exists the program.
- **Attempt Counting**: Keeps track of the total number of attempts made during the password cracking process.
- **User Input**: Asks the user to input the number of processes to use for parallel processing.

In addition, you can change the LETTERS variable to include uppercase letters, numbers, and symbols to increase the number of possible combinations.

You can also modify the max length of the password by changing PASSWORD_LENGTH.
## Usage

1. Run the script with Python 3: `./BruteForce.py`.
2. Enter the number of processes you want to use.
3. The script will start attempting to crack the password using all possible combinations of lowercase letters.
4. If the password is found, the program will display the time elapsed and the total number of attempts made.

## Code Structure

- **`finnish` Function**: Handles Ctrl+C interrupts, terminates the multiprocessing pool, and exits the program gracefully.
- **`attempt_decryption` Function**: Tries to decrypt the password with the next passphrase and updates the attempt count.
- **`map_attempt_decryption` Function**: Maps the `attempt_decryption` function to the data and attempts to decrypt the password in a loop.
- **Main Section**: Utilizes the `multiprocessing.Pool` to parallelize the password cracking process.

## Dependencies

- Python 3
- `multiprocessing` module

Change PASSWORD to the password you want to crack.