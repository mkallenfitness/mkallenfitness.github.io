import hashlib
import os
import re
from pathlib import Path

ROOT = 'condo'
HTML_FILE = f'index.html'
FILES_TO_HASH = [
    'scripts.js',
    'styles.css'
]
FOLDERS_TO_HASH = [
    'photos'
]
URL_PARAM = 'v'

# Function to generate hash for a file
def generate_file_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    hash = hasher.hexdigest()
    return hash

# Function to update the references in HTML
def update_html_references(html_file, files_with_hash):
    print(f"Opening {html_file}")
    with open(html_file, 'r') as file:
        content = file.read()

    for original, hashed in files_with_hash.items():
        find = rf'({original})(\?{URL_PARAM}=[a-f0-9]+)?'
        replace = f'{original}?{URL_PARAM}={hashed}'
        print(f"Setting hash for {replace}")
        content = re.sub(find, replace, content)

    with open(html_file, 'w') as file:
        file.write(content)
    print(f"Closing {html_file}")

all_files = [file for file in FILES_TO_HASH]
for folder in FOLDERS_TO_HASH:
    all_files += [f'{file}'.removeprefix(f'{ROOT}/') for file in Path(f'{ROOT}/{folder}').rglob('*')]

# Generate hashes for the specified files
print(f"Generating {len(all_files)} file hashes")
files_with_hash_dict = {file: generate_file_hash(f'{ROOT}/{file}') for file in all_files}

# Update the references in the HTML file
update_html_references(f'{ROOT}/{HTML_FILE}', files_with_hash_dict)
