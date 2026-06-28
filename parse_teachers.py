import re
from html.parser import HTMLParser

html_path = "/home/abubakrx/Музыка/PIIMA Study Portal.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's clean up comments to avoid issues
content_clean = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

# A simple parser to extract all table cells
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
            self.current_row.append(cell_text)
            self.in_cell = False

    def handle_data(self, data):
        if self.in_cell:
            self.current_cell.append(data)

parser = TableParser()
parser.feed(content_clean)

print(f"Parsed {len(parser.rows)} rows")
for i, r in enumerate(parser.rows[:30]):
    print(f"Row {i}:", r)

# Also write all parsed rows to a text file for inspection
with open("parsed_rows.txt", "w", encoding="utf-8") as out:
    for i, r in enumerate(parser.rows):
        out.write(f"Row {i}: {r}\n")
