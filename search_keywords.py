import re

html_path = "/home/abubakrx/Музыка/PIIMA Study Portal.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for some text patterns that could refer to roles or management
keywords = [
    "direktor", "director", "o'rinbosar", "orinbosar", "o‘rinbosar", 
    "boshliq", "rahbar", "menejer", "manager", "buxgalter", "kadr", "admin",
    "maktab", "filial", "lavozim", "rol", "status", "mutaxassis"
]

print("Searching for keywords in HTML:")
for kw in keywords:
    matches = list(re.finditer(re.escape(kw), content, re.IGNORECASE))
    print(f"Keyword '{kw}' found {len(matches)} times")
    if len(matches) > 0:
        for m in matches[:3]:
            start = max(0, m.start() - 50)
            end = min(len(content), m.end() + 100)
            print(f"  Match at {m.start()}: {content[start:end].strip()}")
        print("-" * 50)
