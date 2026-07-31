import re

html_path = 'd:/CV/My portfolio/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# For Certificates
cert_wrapper = """      <div class="scroll-container" style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 1rem;">
        <button class="scroll-btn left-arrow" onclick="document.querySelector('.cert-grid').scrollBy({left: -350, behavior: 'smooth'})" aria-label="Scroll left">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="cert-grid">"""

cert_wrapper_end = """        </div>

        <button class="scroll-btn right-arrow" onclick="document.querySelector('.cert-grid').scrollBy({left: 350, behavior: 'smooth'})" aria-label="Scroll right">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>"""

content = re.sub(r'      <div class="cert-grid">', cert_wrapper, content, count=1)

# Find the end of certs:</div></div></section>
# Be careful here, the end might have different spacing.
# Using a precise split for safety.
if '<div class="projects-grid">' in content:
    cert_section, rest = content.split('<!-- PROJECTS -->')
    cert_section = re.sub(r'        </div>\s*</div>\s*</section>\s*$', r'        </div>\n' + cert_wrapper_end + r'\n    </div>\n  </section>\n\n  ', cert_section)
    content = cert_section + '<!-- PROJECTS -->' + rest

# For Projects
proj_wrapper = """      <div class="scroll-container" style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 1rem;">
        <button class="scroll-btn left-arrow" onclick="document.querySelector('.projects-grid').scrollBy({left: -350, behavior: 'smooth'})" aria-label="Scroll left">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="projects-grid">"""

proj_wrapper_end = """        </div>

        <button class="scroll-btn right-arrow" onclick="document.querySelector('.projects-grid').scrollBy({left: 350, behavior: 'smooth'})" aria-label="Scroll right">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>"""

content = re.sub(r'      <div class="projects-grid">', proj_wrapper, content, count=1)

if '<!-- CONTACT -->' in content:
    proj_section, rest2 = content.split('<!-- CONTACT -->')
    proj_section = re.sub(r'        </div>\s*</div>\s*</section>\s*$', r'        </div>\n' + proj_wrapper_end + r'\n    </div>\n  </section>\n\n  ', proj_section)
    content = proj_section + '<!-- CONTACT -->' + rest2

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added scroll wrappers in index.html")
