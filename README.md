# Dictionary Attack Python Script

## Overview

This Python script simulates a dictionary attack on a password using a list of common passwords and their variations. The attack involves hashing each password and comparing it with a target hashed password.

## Usage

Run the script using the command: `./DictionaryAttack`.

## Features

- Colors for the output.
- Common passwords and variations are predefined to simulate attacks using hashed passwords.

## Script Details

- The `DictAttack` class initializes with a target hashed password, common passwords, and variations.
- The `attempt_attack` method iterates through possible passwords and variations, hashes them, and checks for a match.
- If a match is found, the script prints the password in green; otherwise, it prints a failure message in red.

## Example

```bash
./DictionaryAttack.py
```

You can also run *run.sh* to run the script.
