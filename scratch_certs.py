import re

html_path = 'd:/CV/My portfolio/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

certificates_html = """      <div class="cert-grid">
        <div class="cert-card">
          <div class="cert-icon-wrap"><i class="fas fa-network-wired"></i></div>
          <h3 class="cert-title">IT Essentials</h3>
          <p class="cert-issuer"><i class="fas fa-building"></i> Cisco Networking Academy</p>
          <p class="cert-date"><i class="fas fa-calendar-alt"></i> 27 Jul 2025</p>
          <a href="#" class="cert-link">View Certificate <i class="fas fa-external-link-alt"></i></a>
          <!-- Hover Slider Placeholder -->
          <div class="card-slider">
            <div class="slider-track">
              <!-- Add your images here -->
              <img src="assets/cisco_cert.png" alt="IT Essentials Certificate" />
            </div>
          </div>
        </div>

        <div class="cert-card">
          <div class="cert-icon-wrap"><i class="fas fa-mobile-alt"></i></div>
          <h3 class="cert-title">Introduction to Flutter</h3>
          <p class="cert-issuer"><i class="fas fa-building"></i> Simplilearn</p>
          <p class="cert-date"><i class="fas fa-calendar-alt"></i> 24 Apr 2026</p>
          <a href="#" class="cert-link">View Certificate <i class="fas fa-external-link-alt"></i></a>
          <!-- Hover Slider Placeholder -->
          <div class="card-slider">
            <div class="slider-track">
              <!-- Add your images here -->
              <img src="assets/flutter_cert.png" alt="Flutter Certificate" />
            </div>
          </div>
        </div>

        <div class="cert-card">
          <div class="cert-icon-wrap"><i class="fab fa-android"></i></div>
          <h3 class="cert-title">Android App Development</h3>
          <p class="cert-issuer"><i class="fas fa-building"></i> Simplilearn</p>
          <p class="cert-date"><i class="fas fa-calendar-alt"></i> 19 Apr 2026</p>
          <a href="#" class="cert-link">View Certificate <i class="fas fa-external-link-alt"></i></a>
          <!-- Hover Slider Placeholder -->
          <div class="card-slider">
            <div class="slider-track">
              <!-- Add your images here -->
              <img src="assets/android_cert.png" alt="Android Certificate" />
            </div>
          </div>
        </div>

        <div class="cert-card">
          <div class="cert-icon-wrap"><i class="fas fa-laptop-code"></i></div>
          <h3 class="cert-title">Web Design for Beginners</h3>
          <p class="cert-issuer"><i class="fas fa-building"></i> University of Moratuwa</p>
          <p class="cert-date"><i class="fas fa-calendar-alt"></i> Completed</p>
          <a href="#" class="cert-link">View Certificate <i class="fas fa-external-link-alt"></i></a>
          <!-- Hover Slider Placeholder -->
          <div class="card-slider">
            <div class="slider-track">
              <!-- Add your images here -->
              <img src="assets/web_cert.png" alt="Web Design Certificate" />
            </div>
          </div>
        </div>

        <div class="cert-card">
          <div class="cert-icon-wrap"><i class="fas fa-paint-brush"></i></div>
          <h3 class="cert-title">UI Design With Figma</h3>
          <p class="cert-issuer"><i class="fas fa-building"></i> Alison</p>
          <p class="cert-date"><i class="fas fa-calendar-alt"></i> 9 Jun 2025</p>
          <a href="#" class="cert-link">View Certificate <i class="fas fa-external-link-alt"></i></a>
          <!-- Hover Slider Placeholder -->
          <div class="card-slider">
            <div class="slider-track">
              <!-- Add your images here -->
              <img src="assets/figma_cert.png" alt="Figma Certificate" />
            </div>
          </div>
        </div>
      </div>"""

# Replace the entire <div class="cert-grid"> ... </div> up to the end of that section
# It is between <div class="cert-grid"> and </section> (but before the closing tag of section)
# Wait, <div class="cert-grid"> ends with </div>, then </div> (for container), then </section>
new_content = re.sub(r'      <div class="cert-grid">.*?      </div>\n    </div>\n  </section>', certificates_html + '\n    </div>\n  </section>', content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Certificates updated")
