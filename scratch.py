import re

html_path = 'd:/CV/My portfolio/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

skills_str = """      <div class="skills-section">
        <div class="skills-wrapper" style="position: relative; display: flex; align-items: center; gap: 1rem; width: 100%; max-width: 900px; margin: 0 auto;">
          <button class="scroll-btn left-arrow" onclick="document.querySelector('.skills-grid').scrollBy({left: -200, behavior: 'smooth'})" aria-label="Scroll left">
             <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="skills-grid">
            <div class="skill-item" data-percent="85">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-react"></i></div>
              </div>
              <span class="skill-percent">85%</span>
              <span class="skill-name">React.js</span>
            </div>
            
            <div class="skill-item" data-percent="82">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-python"></i></div>
              </div>
              <span class="skill-percent">82%</span>
              <span class="skill-name">Python</span>
            </div>
            
            <div class="skill-item" data-percent="72">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fas fa-mobile-alt"></i></div>
              </div>
              <span class="skill-percent">72%</span>
              <span class="skill-name">Flutter / Dart</span>
            </div>
            
            <div class="skill-item" data-percent="75">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-node-js"></i></div>
              </div>
              <span class="skill-percent">75%</span>
              <span class="skill-name">Node.js</span>
            </div>
            
            <div class="skill-item" data-percent="70">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fas fa-database"></i></div>
              </div>
              <span class="skill-percent">70%</span>
              <span class="skill-name">MongoDB</span>
            </div>

            <div class="skill-item" data-percent="70">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fas fa-fire"></i></div>
              </div>
              <span class="skill-percent">70%</span>
              <span class="skill-name">Firebase</span>
            </div>
            
            <div class="skill-item" data-percent="90">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-js"></i></div>
              </div>
              <span class="skill-percent">90%</span>
              <span class="skill-name">JavaScript</span>
            </div>
            
            <div class="skill-item" data-percent="88">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-html5"></i></div>
              </div>
              <span class="skill-percent">88%</span>
              <span class="skill-name">HTML / CSS</span>
            </div>
            
            <div class="skill-item" data-percent="80">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-java"></i></div>
              </div>
              <span class="skill-percent">80%</span>
              <span class="skill-name">Java</span>
            </div>
            
            <div class="skill-item" data-percent="65">
              <div class="skill-circle">
                <svg viewBox="0 0 100 100"><circle class="skill-bg" cx="50" cy="50" r="42" /><circle class="skill-progress" cx="50" cy="50" r="42" /></svg>
                <div class="skill-icon-inner"><i class="fab fa-microsoft"></i></div>
              </div>
              <span class="skill-percent">65%</span>
              <span class="skill-name">C#</span>
            </div>
          </div>
          
          <button class="scroll-btn right-arrow" onclick="document.querySelector('.skills-grid').scrollBy({left: 200, behavior: 'smooth'})" aria-label="Scroll right">
             <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>"""

new_content = re.sub(r'      <div class="skills-section">.*?</div>\s*</div>\s*</div>\s*</section>', skills_str + '\n    </div>\n  </section>', content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated index.html")
