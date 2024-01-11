# Brute Force Password Cracker

This Python script demonstrates a basic brute-force password cracking algorithm. The script iterates through all possible combinations of lowercase alphabetical characters to find a specified target password.

## How it Works

1. **CHARACTERS**: The character set used for password combinations is 'abcdefghijklmnopqrstuvwxyz'. The rest of the characters can be added to the `CHARACTERS` variable if needed.

2. **bf_attack Function**: The `bf_attack` function attempts to crack the target password by generating all possible combinations of characters within the specified length.

3. **Parameters**:
   - `target_pass`: The password to be cracked.
   - `password_length`: The starting length of generated passwords.
   - `max_attempts`: Maximum number of attempts (default is set to 10,000,000).

4. **Concurrency**: The script uses concurrent processing to speed up the brute-force attack by distributing the workload across multiple processes. You can also change the number of processes by modifying the `processes` variable.

## Usage

1. Modify the `CHARACTERS` variable if needed.
2. You can change `target_pass` to crack different passwords.
3. Run the script, and it will attempt to crack the password using multiple processes.


## How to Run

```bash
./BruteForce.py
```



