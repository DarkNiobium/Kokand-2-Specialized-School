import re
from html.parser import HTMLParser

html_path = "/home/abubakrx/Музыка/PIIMA Study Portal.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

content_clean = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

class TableParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows = []
        self.current_row = []
        self.current_cell = []
        self.in_cell = False
        self.in_row = False

    def handle_starttag(self, tag, attrs):
        if tag == 'tr':
            self.in_row = True
            self.current_row = []
        elif tag in ['td', 'th']:
            self.in_cell = True
            self.current_cell = []

    def handle_endtag(self, tag):
        if tag == 'tr':
            if self.current_row:
                self.rows.append(self.current_row)
            self.in_row = False
        elif tag in ['td', 'th']:
            cell_text = "".join(self.current_cell).strip()
            # Clean up whitespace
            cell_text = re.sub(r'\s+', ' ', cell_text)
            self.current_row.append(cell_text)
            self.in_cell = False

    def handle_data(self, data):
        if self.in_cell:
            self.current_cell.append(data)

parser = TableParser()
parser.feed(content_clean)

# The first row is headers, let's process the rest
teachers_data = []

def to_title_case(name_str):
    # Split by spaces and capitalize each word, except for o'g'li / qizi
    words = name_str.split()
    capitalized_words = []
    for w in words:
        w_lower = w.lower()
        if w_lower in ["o‘g‘li", "o'g'li", "o`g`li", "og'li", "o‘g‘li,", "o'g'li,"]:
            capitalized_words.append("o‘g‘li")
        elif w_lower in ["qizi", "qizi,"]:
            capitalized_words.append("qizi")
        elif w_lower in ["o‘-g‘li", "o'-g'li"]:
            capitalized_words.append("o‘g‘li")
        else:
            # Handle apostrophes in names like G'ulom -> G‘ulom
            # Capitalize first letter of word
            if len(w) > 0:
                # If name starts with O' or G' etc.
                if len(w) > 2 and w[1] in ["'", "‘", "`", "’"]:
                    w_cap = w[0].upper() + w[1] + w[2].upper() + w[3:].lower()
                else:
                    w_cap = w[0].upper() + w[1:].lower()
                capitalized_words.append(w_cap)
    return " ".join(capitalized_words)

def clean_subject(subj_str):
    if not subj_str:
        return "Tarbiyaviy soat"
    
    # Simplify subjects
    parts = [p.strip() for p in subj_str.split(',')]
    primary = parts[0]
    
    # Map primary subject
    p_lower = primary.lower()
    if "matematika" in p_lower or "algebra" in p_lower or "geometriya" in p_lower:
        return "Matematika"
    if "fizika" in p_lower:
        return "Fizika"
    if "kimyo" in p_lower:
        return "Kimyo"
    if "biologiya" in p_lower:
        return "Biologiya"
    if "ingliz tili" in p_lower or "ielts" in p_lower:
        return "Ingliz tili"
    if "tarix" in p_lower:
        return "Tarix"
    if "ona tili" in p_lower or "adabiyot" in p_lower:
        return "Ona tili va adabiyot"
    if "informatika" in p_lower:
        return "Informatika"
    if "jismoniy tarbiya" in p_lower:
        return "Jismoniy tarbiya"
    if "rus tili" in p_lower:
        return "Rus tili"
    if "san'at" in p_lower:
        return "Tasviriy san'at"
    if "shaxmat" in p_lower:
        return "Shaxmat"
    if "robototexnika" in p_lower:
        return "Robototexnika"
    if "texnologiya" in p_lower:
        return "Texnologiya"
    if "chqbt" in p_lower:
        return "ChQBT"
    if "geografiya" in p_lower:
        return "Geografiya"
    if "tarbiya" in p_lower:
        return "Tarbiya"
    
    return primary

for row in parser.rows[1:]:
    if len(row) < 5:
        continue
    raw_name = row[1]
    raw_subjects = row[4]
    
    name = to_title_case(raw_name)
    subject = clean_subject(raw_subjects)
    
    # Formulate a nice role
    if subject == "Ona tili va adabiyot":
        role = "Ona tili va adabiyot o'qituvchisi"
    elif "IELTS" in raw_subjects:
        role = "Ingliz tili (IELTS) o'qituvchisi"
    elif "SAT" in raw_subjects:
        role = f"{subject} (SAT) o'qituvchisi"
    elif subject in ["Tasviriy san'at", "Jismoniy tarbiya", "Robototexnika", "Shaxmat", "Tarbiya"]:
        role = f"{subject} o'qituvchisi"
    else:
        role = f"{subject} o'qituvchisi"
        
    teachers_data.append({
        "name": name,
        "role": role,
        "subject": subject,
        "phone": "",
        "education": ""
    })

print(f"Formed {len(teachers_data)} teachers records")

# Output the ts array structure
with open("teachers_array.json", "w", encoding="utf-8") as out:
    import json
    json.dump(teachers_data, out, ensure_ascii=False, indent=2)
