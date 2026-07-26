# Fix HTML entities in index.html

with open('/Users/nihar/Desktop/Portfolio/index.html', 'r') as f:
    content = f.read()

# Fix the Google Fonts URL - replace raw & with &
content = content.replace(
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
)

# Fix other raw & characters - use the HTML entity &
content = content.replace('Plotly & Matplotlib', 'Plotly & Matplotlib')
content = content.replace('Tools & Tech', 'Tools & Tech')
content = content.replace('HTML, CSS & Vanilla', 'HTML, CSS & Vanilla')

with open('/Users/nihar/Desktop/Portfolio/index.html', 'w') as f:
    f.write(content)

print('Fixed HTML entities')