import re

html_path = 'd:/CV/My portfolio/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

def inject_slider(match):
    # Match is something like `<div class="project-card"> ... </a> \n </div>`
    # We want to replace the `</a> \n </div>` with `</a> \n <slider> \n </div>`
    card_text = match.group(0)
    
    slider_html = """</a>
          <!-- Hover Slider Placeholder -->
          <div class="card-slider">
            <div class="slider-track">
              <!-- Add your images here -->
              <img src="assets/placeholder1.png" alt="Screenshot 1" />
              <img src="assets/placeholder2.png" alt="Screenshot 2" />
            </div>
          </div>
        </div>"""
        
    return re.sub(r'</a>\s*</div>$', slider_html, card_text)

# Regex to match the whole card block
new_content = re.sub(r'<div class="(cert-card|project-card)">.*?</a>\s*</div>', inject_slider, content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Added sliders to cards in index.html")
