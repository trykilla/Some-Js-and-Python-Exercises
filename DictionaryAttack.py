#!/usr/bin/env python3

import hashlib

GREEN = '\033[92m'
RED = '\033[91m'
ENDC = '\033[0m'  

PASSWORD = "e7fc5be0f8d225b190238aeca9e7fee5f344637c14e45005a851a8aa9b6dd961"

class DictAttack:
    def __init__(self, target_password):
        self.target_password = target_password
        self.common_passwords = ["password", "password123", "letmein", "qwerty",
                                 "123456", "abc123", "admin", "welcome", "monkey", "sunshine"]
        self.password_variations = ["", "123", "1234", "12345", "123456", "!", "@", "#", "$", "%",
                                    "^", "&", "*", "(", ")", "-", "_", "+", "=", "/", "\\", "|", "[", "]", "{", "}", "<", ">"]

    def hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def attempt_attack(self):
        for password in self.common_passwords:
            for variation in self.password_variations:
                trying_pass = password + variation
                hashed_pass = self.hash_password(trying_pass)
                if hashed_pass == self.target_password:
                    return f"{GREEN}Found pass is: {trying_pass}{ENDC}"
        return f"{RED}Password not found in attack.{ENDC}"


# We introduce the hash of the password we want to crack for a more realistic attack
# If the dictionaries were larger, we could use threads or processes to speed up the attack

if __name__ == "__main__":

    new_attack = DictAttack(PASSWORD)
    print(new_attack.attempt_attack())
