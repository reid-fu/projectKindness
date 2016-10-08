# projectKindness
Chrome plugin that reminds people when they're about to post something offensive

## Architecture
- AWS EC2 instance hosts server that analyzes text for harassment potential
- AWS S3 stores data used for text analysis
- Chrome plugin scrapes and sends data from textboxes
- Web development framework with node.js, HTML, CSS

## Workflow
1. User types text in textbox. As user is typing, Chrome plugin sends text to server.
2. Server filters text for nouns, verbs, adjectives, adverbs, participles, and interjections
- Part of speech tagging done using Stanford CoreNLP. Tags follow Penn Treebank.
- Noun tags start with "NN". Verb tags start with "VB". Adjectives start with "JJ".
- Adverbs start with "RB". Participles (adjectives/nouns derived from verbs) are "RP". Interjections are "UH".