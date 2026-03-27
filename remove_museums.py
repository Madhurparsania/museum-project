import re

def process_mock_museums(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to keep visvesvaraya and hal-aerospace. 
    # Because replacing exactly can be tricky, we'll find all objects in the museum array and only keep those two.
    # The structure is `export const museums = [ { id: '...', ... }, ... ];`
    # We can split by `    {\n        id: '` and process.
    
    parts = content.split("    {\n        id: '")
    new_parts = [parts[0]]
    for p in parts[1:]:
        if p.startswith("visvesvaraya'") or p.startswith("hal-aerospace'"):
            new_parts.append("    {\n        id: '" + p)
            
    # Also fix the comma/closing bracket at the end of the last kept item if needed.
    # actually, the last item in our kept list might be `hal-aerospace`. Let's just do a regex.
    
    # A more robust regex way:
    # Match from `    {\n        id: 'govt-museum',` mostly up to the next `    {\n        id: '` or `];`
    
    # Let's just do literal replacements based on known ids.
    ids_to_remove = ['govt-museum', 'ngma', 'bangalore-palace', 'tipu-palace', 'nehru-planetarium', 'ime']
    
    for rm_id in ids_to_remove:
        pattern = re.compile(r"    \{\s+id: '" + rm_id + r"'.*?(?=    \{\s+id: '|\];)", re.DOTALL)
        content = re.sub(pattern, "", content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_actions_py(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    ids_to_remove = ['govt-museum', 'ngma', 'bangalore-palace', 'tipu-palace', 'nehru-planetarium', 'ime']
    for rm_id in ids_to_remove:
        # Match `"govt-museum": { ... },` or without comma if it's the last one.
        pattern = re.compile(r'    "' + rm_id + r'": \{.*?(?=    "|};)', re.DOTALL)
        content = re.sub(pattern, "", content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

process_mock_museums('src/data/mockMuseumInfo.js')
process_actions_py('rasa-chatbot/actions/actions.py')

print("Done")
