# projectKindness
Chrome plugin that reminds people when they're about to post something offensive
## Architecture
- AWS EC2 instance hosts server that analyzes text for harassment potential
- AWS S3 stores data used for text analysis
- Chrome plugin scrapes and sends data from textboxes
- Web development framework with node.js, HTML, CSS
## Workflow
- User types text in textbox. As user is typing, Chrome plugin sends text to server.
* Markdown sublist test