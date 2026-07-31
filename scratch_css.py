import re

css_path = 'd:/CV/My portfolio/styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace .cert-grid
new_cert_grid = """.cert-grid {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 2rem;
  padding: 1rem 0;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
}
.cert-grid::-webkit-scrollbar {
  display: none;
}"""
content = re.sub(r'\.cert-grid\s*\{[^}]*\}', new_cert_grid, content, count=1)

# Replace .cert-card
new_cert_card = """.cert-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 2rem 1.8rem;
  text-align: center;
  transition: var(--transition);
  cursor: default;
  position: relative;
  overflow: hidden;
  flex: 0 0 calc((100% - 4rem) / 3);
  min-width: 300px;
}"""
content = re.sub(r'\.cert-card\s*\{[^}]*\}', new_cert_card, content, count=1)


# Replace .projects-grid
new_proj_grid = """.projects-grid {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 2rem;
  padding: 1rem 0;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
}
.projects-grid::-webkit-scrollbar {
  display: none;
}"""
content = re.sub(r'\.projects-grid\s*\{[^}]*\}', new_proj_grid, content, count=1)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated CSS")
