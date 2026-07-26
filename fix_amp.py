with open('/Users/nihar/Desktop/Portfolio/index.html', 'r') as f:
    content = f.read()

# HTML entity for &
amp = '&'

# Replace raw & with & in specific places
content = content.replace(
    'family=Inter:wght@300;400;500;600;700;800' + amp + 'family=JetBrains+Mono:wght@400;500;600',
    'family=Inter:wght@300;400;500;600;700;800' + amp + 'family=JetBrains+Mono:wght@400;500;600'
)
content = content.replace('Plotly ' + amp + ' Matplotlib', 'Plotly ' + amp + ' Matplotlib')
content = content.replace('Tools ' + amp + ' Tech', 'Tools ' + amp + ' Tech')
content = content.replace('HTML, CSS ' + amp + ' Vanilla', 'HTML, CSS ' + amp + ' Vanilla')

with open('/Users/nihar/Desktop/Portfolio/index.html', 'w') as f:
    f.write(content)

print('Done')